const express = require("express");
const {getAllUsers, getUser} = require(`${__dirname}/../controllers/userController`);

userRouter = express.Router();



userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").get(getUser);

module.exports = userRouter;