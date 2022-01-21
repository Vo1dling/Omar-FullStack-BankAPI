const User = require("../../../models/user");
const path = require("path");

const getData = async (id) => {
  let users = "";
  if (id) users = await User.findById(id);
  else users = await User.find({});

  return users;
};
const addUser = async (information) => {
  const createdUser = new User(information);
  return createdUser;
};

const deposit = async (depositAmount, id) => {
  const user = User.findById(id);
  user.cash += depositAmount;
  await user.save();
  return user;
};

const updateCredit = async (newCredit, id) => {
  const user = User.findById(id);
  user.credit += newCredit;
  await user.save();
  return user;
};

const withdraw = async (withdrawAmount, id) => {
  const user = User.findById(id);
  user.cash -= withdrawAmount;
  await user.save();
  return user;
};

const transfer = async (transferAmount, giverId, receiverId) => {
  const giverUser = User.findById(giverId);
  if (giverUser.cash + giverUser.credit < transferAmount) {
    throw new Error("Not Enough Funds");
  } else if (giverUser.cash < transferAmount) {
    transferAmount -= giverUser.cash;
    giverUser.cash = 0;
    giverUser.credit -= transferAmount;
  } else giverUser.cash -= transferAmount;
  await giverUser.save();

  const receiverUser = User.findById(receiverId);
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
};
