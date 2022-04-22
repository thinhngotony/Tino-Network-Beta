const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain");
const P2pServer = require("./p2p-server");
const Wallet = require("../wallet");
const TransactionPool = require("../wallet/transaction-pool");
const Miner = require("./miner");
// const Users = require("../user/user-pool");
// const User = require("../user");

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const usersRoutes = require("./api/routes/users");
const privateKeyRoutes = require("./api/routes/privateKey");

// const users = new Users();
const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);

mongoose.connect(
  `mongodb+srv://thiennguyen0103:odazLaTgHqXsX9zg@cluster0.zb0db.mongodb.net/blockchain?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(cors());
app.use(bodyParser.json());

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.post("/mine", (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  p2pServer.syncChains();
  res.redirect("/blocks");
});

app.get("/transactions", (req, res) => {
  res.json(tp.transactions);
});

app.post("/transact", (req, res) => {
  const { recipient, statusNow } = req.body;
  const transaction = wallet.createTransaction(recipient, statusNow, bc, tp);
  p2pServer.broadcastTransaction(transaction);
  res.redirect("/transactions");
});

app.get("/mine-transactions", (req, res) => {
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.redirect("/blocks");
});

app.get("/public-key", (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});

// app.get("/generate-user", (req, res) => {
//   const user = new User();
//   res.json(users.addNewUser(user));
// });

// app.get("/users", (req, res) => {
//   res.json(users.getUserList());
// });

// app.post("/existed-user", (req, res) => {
//   res.json(users.isExistedUser(req.body.seedPhrase));
// });

app.use("/users", usersRoutes);
app.use("/private-key", privateKeyRoutes);

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
