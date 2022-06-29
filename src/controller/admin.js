/**
 * Title: Admin controller
 * Description:
 * Author: Samin Yasar
 * Date: 29/June/2022
 */

// Dependencies
const adminService = require("../service/admin");
const { responseSender } = require("../util/script");

// Module scaffolding
const adminController = {};

adminController.getUsers = async (req, res) => {
    /**
     * TODO:*
     * if req.user not valid return --> 500
     * Return all the users except the requested admin's information and also remove all user's password
     */
    if (!req.user) {
        responseSender(res, 500, {
            message: "Error occures in the server side.",
        });
    } else {
        console.log("USER", req.user);
        const adminId = req.user._doc._id.toString();
        const users = await adminService.findUsersForAdmin(adminId);
        if (users) {
            responseSender(res, 200, { message: "Success.", users });
        } else {
            responseSender(res, 500, {
                message: "Error occures in the server side.",
            });
        }
    }
};

// Export module
module.exports = adminController;
