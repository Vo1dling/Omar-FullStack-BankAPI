const express = require("express");
const {
  getAllUsers,
  getUser,
  postUser,
  performAction,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUser);
userRouter.post("/users", postUser);
userRouter.put("/users/:action/:id", performAction);
module.exports = userRouter;
