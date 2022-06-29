/**
 * Title: ToDo App
 * Description: User based ToDo app (Server)
 * Author: Samin Yasar
 * Date: 28/June/2022
 */

// Dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config("../.env");

const adminRouter = require("../router/admin");
const userRouter = require("../router/user");
const authorizationMiddleware = require("../middleware/authorization");
const notFoundMiddleware = require("../middleware/notFound");
const errorController = require("../controller/error");

// Module scaffolding
const app = express();

// configure
app.use(cors());
app.use(express.json());

// admin routes
app.use("/api/v1/admin/", authorizationMiddleware, adminRouter);

// user routes
app.use("/api/v1/u/", userRouter);

// 404 middleware
app.use(notFoundMiddleware);

// Default error controller
app.use(errorController);

// Export module
module.exports = app;
