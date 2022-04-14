const ChainUtil = require('../chain-util');
const { MINING_REWARD } = require('../config');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, recipient, statusNow) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

    if (statusNow > senderOutput.statusNow) {
      console.log(`statusNow: ${statusNow} exceeds status.`);
      return;
    }

    senderOutput.statusNow = senderOutput.statusNow - statusNow;
    this.outputs.push({ statusNow, address: recipient });
    Transaction.signTransaction(this, senderWallet);

    return this;
  }

  static transactionWithOutputs(senderWallet, outputs) {
    const transaction = new this();
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static newTransaction(senderWallet, recipient, statusNow) {
    if (statusNow > senderWallet.status) {
      console.log(`statusNow: ${statusNow} exceeds status.`);
      return;
    }

    return Transaction.transactionWithOutputs(senderWallet, [
      { statusNow: senderWallet.status - statusNow, address: senderWallet.publicKey },
      { statusNow, address: recipient }
    ]);
  }

  static rewardTransaction(minerWallet, blockchainWallet) {
    return Transaction.transactionWithOutputs(blockchainWallet, [{
      statusNow: MINING_REWARD, address: minerWallet.publicKey
    }]);
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      statusNow: senderWallet.status,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    }
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

module.exports = Transaction;