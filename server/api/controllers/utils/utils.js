const User = require("../../../models/user");
const path = require("path");
const getReact = () => {
  return path.resolve(__dirname, "../../../../client/build");
};

const getData = async (id) => {
  let users = [];
  if (id) users = await User.findById(id);
  else users = await User.find({});

  return users;
};
const addUser = async (information) => {
  const createdUser = new User(information);
  return createdUser;
};

const deposit = async (id, depositAmount) => {
  const user = await User.findById(id);
  user.cash += depositAmount;
  await user.save();
  return user;
};

const updateCredit = async (id, updatedCredit) => {
  const user = await User.findById(id);
  user.credit = updatedCredit;
  await user.save();
  return user;
};

const withdraw = async (id, withdrawAmount) => {
  const user = await User.findById(id);
  user.cash -= withdrawAmount;
  await user.save();
  return user;
};

const transfer = async (giverId, receiverId, transferAmount) => {
  const giverUser = await User.findById(giverId);
  if (giverUser.cash + giverUser.credit < transferAmount) {
    throw new Error("Not Enough Funds");
  } else if (giverUser.cash < transferAmount) {
    transferAmount -= giverUser.cash;
    giverUser.cash = 0;
    giverUser.credit -= transferAmount;
  } else giverUser.cash -= transferAmount;
  await giverUser.save();

  const receiverUser = await User.findById(receiverId);
  receiverUser.cash += transferAmount;
  await receiverUser.save();
  return [giverUser, receiverUser];
};

module.exports = {
  getData,
  addUser,
  withdraw,
  deposit,
  updateCredit,
  transfer,
  getReact,
};
