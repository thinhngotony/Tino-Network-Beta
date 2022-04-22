const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  seedPhrase: {
    type: String,
    required: true
  },
  publicKey: {
    type: String,
    required: true,
  },
  userName: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  status: {
    type: String,
    default: "Free"
  },
  to: {
    type: String
  }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;