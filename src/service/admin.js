/**
 * Title: Admin service related stuff
 * Description:
 * Author: Samin Yasar
 * Date: 29/June/2022
 */

// Dependencies
const userModel = require("../model/User");

// Module scaffolding
const adminService = {};

/**
 * Find by any property from user database
 *
 * @param {String} key
 * @param {any} value
 * @returns {Promise}
 */
adminService.findByProp = (key, value) => {
    if (key === "_id") {
        return userModel.findById(value);
    } else {
        return userModel.findOne({ [key]: value });
    }
};

/**
 * Update an user's acceptable data by id
 *
 * @param {String} id
 * @param {Object} updateData
 * @returns {Promise}
 */
adminService.updateById = (id, updateData) => {
    return userModel.findByIdAndUpdate(id, { ...updateData }, { new: true });
};

/**
 * Find all users and admin except the given adminId
 *
 * @param {String} adminId
 * @returns {Array}
 */
adminService.findUsersForAdmin = async (adminId) => {
    const users = [];
    (await userModel.find()).forEach((item) => {
        if (item._doc._id.toString() !== adminId) {
            delete item._doc.password;
            users.push({
                ...item._doc,
            });
        }
    });
    return users;
};

// Export module
module.exports = adminService;
