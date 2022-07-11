/**
 * Title: Token model
 * Description:
 * Author: Samin Yasar
 * Date: 30/June/2022
 */

// Dependencies
const mongoose = require("mongoose");

// Module scaffolding
const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
});

// create model
const tokenModel = mongoose.model("Token", tokenSchema);

// Export module
module.exports = tokenModel;
