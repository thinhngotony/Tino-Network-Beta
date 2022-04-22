const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const uuidV1 = require('uuid/v1');
const ec = new EC('secp256k1');

const bip39 = require('bip39');
const crypto = require("crypto");
class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidV1();
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
  }

  static generatePrivateKey() {
    const privatekey = crypto.randomBytes(16).toString('hex');
    return privatekey;
  }

  static generatePublicKey(privateKey) {
    const publicKey = this.hash(privateKey);
    return publicKey;
  }

  static generateSeedPhrase(privateKey) {
    return bip39.entropyToMnemonic(privateKey);
  }
}

module.exports = ChainUtil;