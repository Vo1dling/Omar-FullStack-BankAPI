const express = require("express");
const { send } = require("express/lib/response");
const {
  getData,
  addUser,
  withdraw,
  deposit,
  updateCredit,
  transfer,
} = require("./utils/utils");

const app = express();
app.use(express.json());

const getAllUsers = async (req, res) => {
  try {
    const users = await getData();
    if (!users[0]) return res.status(404).send("No Users found");

    res.send(users);
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
};
const postUser = async (req, res) => {
  try {
    const user = await addUser(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    if (e.message.includes("validation"))
      return res.status(400).send(e.message);
    res.status(500).send(e.message);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getData(req.params.id);
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const performAction = async (req, res) => {
  const { id, action } = req.params;
  const amount = req.body.amount;
  let actionFunction;
  switch (action) {
    case "withdraw":
      actionFunction = withdraw;
      break;
    case "deposit":
      actionFunction = deposit;
      break;
    case "transfer":
      actionFunction = transfer;
      break;
    case "updateCredit":
      actionFunction = updateCredit;
      break;
  }

  try {
    const targetID = req.body.targetID;
    let users = [];
    if (!targetID) {
      users = await actionFunction(id, amount);
    } else {
      users = await actionFunction(id, targetID, amount);
    }
    res.send(users);
  } catch (e) {
    if (e.message.includes("validation") || e.message.includes("Not"))
      return res.status(400).send(e.message);
    else if (e.message.includes("null"))
      return res.status(404).send("User not found");
    res.status(500).send(e.message);
  }
};
module.exports = { getAllUsers, postUser, performAction, getUser };
