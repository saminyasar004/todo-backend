/**
 * Title: User router
 * Description:
 * Author: Samin Yasar
 * Date: 28/June/2022
 */

// Dependencies
const express = require("express");

const userController = require("../controller/user");
const authenticationMiddleware = require("../middleware/authentication");

// Module scaffolding
const userRouter = express.Router();

// register user
userRouter.post("/register", userController.register);

// login user
userRouter.get("/login", userController.login);

// update user
// userRouter.patch("/:userId", authenticationMiddleware, userController);

// Export module
module.exports = userRouter;
