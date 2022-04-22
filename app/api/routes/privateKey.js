const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ChainUtil = require("../../../chain-util");
const PrivateKey = require("../models/privateKey");
const Users = require("../models/users");

router.get("/", (req, res) => {
  const private = ChainUtil.generatePrivateKey();
  const public = ChainUtil.generatePublicKey(private);
  const seedPhrase = ChainUtil.generateSeedPhrase(private);
  const privateKey = new PrivateKey({
    privateKey: private,
  });
  const users = new Users({
    seedPhrase: seedPhrase,
    publicKey: public,
    userName: "",
    email: "",
    phoneNumber: "",
  });
  try {
    privateKey.save();
    users.save();
  } catch (error) {
    res.status(500).send(error);
  }

  res.json({
    seedPhrase
  });
});

module.exports = router;