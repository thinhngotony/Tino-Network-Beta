const mongoose = require("mongoose");
const privateKeySchema = new mongoose.Schema({
  privateKey: {
    type: String,
    required: true,
  },
});

const PrivateKey = mongoose.model("Private Key", privateKeySchema);

module.exports = PrivateKey;