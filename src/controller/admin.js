/**
 * Title: Admin controller
 * Description:
 * Author: Samin Yasar
 * Date: 29/June/2022
 */

// Dependencies
const adminService = require("../service/admin");
const { error, responseSender } = require("../util/script");

// Module scaffolding
const adminController = {};

adminController.getUsers = async (req, res, next) => {
    /**
     * TODO:*
     * if req.user not valid return --> 500
     * Return all the users except the requested admin's information and also remove all user's password
     */
    try {
        if (!req.user) {
            throw error(500, "Error occures in the server side.");
        } else {
            const adminId = req.user._doc._id.toString();
            const users = await adminService.findUsersForAdmin(adminId);
            if (!users) {
                throw error(500, "Error occures in the server side.");
            } else {
                responseSender(res, 200, { message: "Success.", users });
            }
        }
    } catch (err) {
        next(err);
    }
};

adminController.editUser = async (req, res, next) => {
    /**
     * TODO:*
     * get one of these two values [role, accountStatus]
     * if not --> return 400
     * get the userId and lookup in the database
     * if not found --> return 400
     * edit --> return 200
     */
    try {
        const role =
            typeof req.body.role === "string" &&
            ["admin", "user"].includes(req.body.role)
                ? req.body.role.trim()
                : null;
        const accountStatus =
            typeof req.body.accountStatus === "string" &&
            ["pending", "active", "rejected"].includes(req.body.accountStatus)
                ? req.body.accountStatus.trim()
                : null;
        if (!role && !accountStatus) {
            throw error(
                400,
                "Please provide a valid role or accountStatus to edit an user."
            );
        } else {
            const userId = req.params.userId ? req.params.userId : null;
            if (!userId) {
                throw error(400, "Please provide user id.");
            } else {
                const user = await adminService.findByProp("_id", userId);
                if (!user) {
                    throw error(400, "Your requested user couldn't found.");
                } else {
                    let updatedUser;
                    try {
                        if (role) {
                            // TODO: EDIT THE USER"S ROLE
                            // user._doc.role = role;
                            updatedUser = await adminService.updateById(
                                user._doc._id,
                                {
                                    role: role,
                                }
                            );
                        }
                        if (accountStatus) {
                            // TODO: EDIT THE USER"S ACCOUNT_STATUS
                            // user._doc.accountStatus = accountStatus;
                            updatedUser = await adminService.updateById(
                                user._doc._id,
                                {
                                    accountStatus: accountStatus,
                                }
                            );
                        }
                    } catch (err) {
                        console.log(err.message);
                        next(error(500, "Error occures in the server side."));
                    } finally {
                        delete updatedUser._doc.password;
                        responseSender(res, 200, {
                            message: "Successfully updated.",
                            user: updatedUser,
                        });
                    }
                }
            }
        }
    } catch (err) {
        next(err);
    }
};

// Export module
module.exports = adminController;
