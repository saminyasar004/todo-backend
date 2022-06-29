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
 * Find all users and admin except the given adminId
 *
 * @param {String} adminId
 * @returns {Array}
 */
adminService.findUsersForAdmin = async (adminId) => {
    const users = [];
    (await userModel.find()).forEach((item) => {
        if (item._doc._id.toString() !== adminId) {
            users.push({
                _id: item._doc._id,
                name: item._doc.name,
                email: item._doc.email,
                role: item._doc.role,
                accountStatus: item._doc.accountStatus,
            });
        }
    });
    return users;
};

// Export module
module.exports = adminService;
