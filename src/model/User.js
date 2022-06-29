/**
 * Title: User model
 * Description: Mongoose model for user
 * Author: Samin Yasar
 * Date: 28/June/2022
 */

// Dependencies
const mongoose = require("mongoose");

// create schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name is too short."],
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true,
    },
    accountStatus: {
        type: String,
        enum: ["pending", "active", "rejected"],
        default: "pending",
        required: true,
    },
});

// create model
const userModel = new mongoose.model("User", userSchema);

// Export model
module.exports = userModel;
