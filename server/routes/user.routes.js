const express = require("express");
const {
  getUsers,
  getUser,
  postUser,
  doAction,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.get("/users/:id", getUser);
userRouter.get("/users", getUsers);
userRouter.post("/users", postUser);
userRouter.put("/users/:action/:id", doAction);

module.exports = userRouter;
