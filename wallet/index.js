const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const { INITIAL_STATUS } = require('../config');

class Wallet {
  constructor() {
    this.status = INITIAL_STATUS;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
      publicKey: ${this.publicKey.toString()}
      status  : ${this.status}`
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(recipient, statusNow, blockchain, transactionPool) {
    this.status = this.calculatestatus(blockchain);

    if (statusNow > this.status) {
      console.log(`statusNow: ${statusNow} exceceds current status: ${this.status}`);
      return;
    }

    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      transaction.update(this, recipient, statusNow);
    } else {
      transaction = Transaction.newTransaction(this, recipient, statusNow);
      transactionPool.updateOrAddTransaction(transaction);
    }

    return transaction;
  }

  calculatestatus(blockchain) {
    let status = this.status;
    let transactions = [];
    blockchain.chain.forEach(block => block.data.forEach(transaction => {
      transactions.push(transaction);
    }));

    const walletInputTs = transactions
      .filter(transaction => transaction.input.address === this.publicKey);

    let startTime = 0;

    if (walletInputTs.length > 0) {
      const recentInputT = walletInputTs.reduce(
        (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current
      );

      status = recentInputT.outputs.find(output => output.address === this.publicKey).statusNow;
      startTime = recentInputT.input.timestamp;
    }

    transactions.forEach(transaction => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find(output => {
          if (output.address === this.publicKey) {
            status = output.statusNow;
          }
        });
      }
    });

    return status;
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.address = 'blockchain-wallet';
    return blockchainWallet;
  }
}

module.exports = Wallet;