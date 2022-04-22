const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ChainUtil = require("../../../chain-util");
const Users = require("../models/users");

router.get("/", (req, res) => {
  const users = Users.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:publicKey", (req, res) => {
  const publicKey = req.params.publicKey;
  Users.findOne({ publicKey: publicKey })
    .exec()
    .then((user) => {
      return res.json(user);
    });
});

router.post("/login", (req, res) => {
  const seedPhrase = req.body.seedPhrase;
  Users.findOne({ seedPhrase: seedPhrase })
    .exec()
    .then((user) => {
      return res.json(user);
    });
});

router.put("/update", (req, res) => {
  Users.findOneAndUpdate(
    { "publicKey": req.body.publicKey },
    {
      userName: req.body.userName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      to: req.body.to,
      status: req.body.status,
    },
  )
    .exec()
    .then((user) => res.json(user));
});

module.exports = router;
