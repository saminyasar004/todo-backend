/**
 * Title: Admin router
 * Description:
 * Author: Samin Yasar
 * Date: 29/June/2022
 */

// Dependencies
const express = require("express");

const adminController = require("../controller/admin");

// Module scaffolding
const adminRouter = express.Router();

// get all users
adminRouter.get("/u/all", adminController.getUsers);

// Export module
module.exports = adminRouter;
