/**
 * Title: Todo model
 * Description: Mongoose model for todo
 * Author: Samin Yasar
 * Date: 28/June/2022
 */

// Dependencies
const mongoose = require("mongoose");

// create schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    todoStatus: {
        type: String,
        enum: ["incomplete", "inProgress", "completed"],
        default: "incomplete",
        required: true,
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
});

// create model
const todoModel = mongoose.model("Todo", todoSchema);

// Export model
module.exports = todoModel;
