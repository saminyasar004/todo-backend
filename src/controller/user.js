/**
 * Title: User controller
 * Description:
 * Author: Samin Yasar
 * Date: 28/June/2022
 */

// Dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config("../../.env");

const { responseSender } = require("../util/script");
const userService = require("../service/user");

// Module scaffolding
const userController = {};

// Register user
userController.register = async (req, res) => {
    /**
     * TODO: *
     * {name, email, password} = Input()
     * if not provide --> return 400
     * check the email is already taken or not
     * if taken --> return 403
     * hash the password
     * save to database --> return 201
     * if failed --> return 500
     */
    const name =
        typeof req.body.name === "string" ? req.body.name.trim() : null;
    const email =
        typeof req.body.email === "string" ? req.body.email.trim() : null;
    const password =
        typeof req.body.password === "string" ? req.body.password.trim() : null;
    if (!name || !email || !password) {
        // if any of these no provide
        responseSender(res, 400, {
            message: "Please provide name, email and password to register.",
        });
    } else {
        const findEmail = await userService.findByProp("email", email);
        if (findEmail) {
            responseSender(res, 403, {
                message: "This email has already an account. Please login.",
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await userService.register({
                name,
                email,
                password: hashedPassword,
            });
            if (!user) {
                responseSender(res, 500, {
                    message: "Error occures in the server side.",
                });
            } else {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    accountStatus: user.accountStatus,
                };
                responseSender(res, 201, {
                    message: "User created successfully.",
                    user: payload,
                });
            }
        }
    }
};

// login user
userController.login = async (req, res) => {
    /**
     * TODO:*
     * {email, password} = input()
     * if not return 400
     * find in the database
     * if not found return 400
     * compare the password
     * if not match return 400
     * generate a jwt token with basic info in payload
     * return the jwt token and 200
     */
    const email =
        typeof req.body.email === "string" ? req.body.email.trim() : null;
    const password =
        typeof req.body.password === "string" ? req.body.password.trim() : null;
    if (!email || !password) {
        responseSender(res, 400, {
            message: "Please provide email and password to login.",
        });
    } else {
        const user = await userService.findByProp("email", email);
        if (!user) {
            responseSender(res, 400, { message: "Invalid credential." });
        } else {
            const isCorrectPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!isCorrectPassword) {
                responseSender(res, 400, {
                    message: "Invalid credential.",
                });
            } else {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    accountStatus: user.accountStatus,
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY);
                responseSender(res, 200, {
                    message: "Login successfull.",
                    token,
                });
            }
        }
    }
};

// Export module
module.exports = userController;