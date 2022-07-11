/**
 * Title: User service related stuff
 * Description:
 * Author: Samin Yasar
 * Date: 29/June/2022
 */

// Dependencies
const userModel = require("../model/User");

// Module scaffolding
const userService = {};

/**
 * Find by any property from user database
 *
 * @param {String} key
 * @param {any} value
 * @returns {Promise}
 */
userService.findByProp = (key, value) => {
    if (key === "_id") {
        return userModel.findById(value);
    } else {
        return userModel.findOne({ [key]: value });
    }
};

/**
 * Creates an user in the database
 *
 * @param {{name: String, email: String, password: String}} user
 * @returns {Promise}
 */
userService.register = async ({ name, email, password }) => {
    let user;
    const userList = (await userModel.find({ role: "admin" })).length;
    if (userList === 0) {
        // * System's first user will be an admin
        user = new userModel({
            name,
            email,
            password,
            role: "admin",
            accountStatus: "active",
        });
    } else {
        user = new userModel({ name, email, password });
    }
    return user.save();
};

// Export module
module.exports = userService;
