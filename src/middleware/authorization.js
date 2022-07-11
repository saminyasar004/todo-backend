/**
 * Title: User authorization middleware
 * Description:
 * Author: Samin Yasar
 * Date: 29/June/2022
 */

// Dependencies
const jwt = require("jsonwebtoken");
require("dotenv").config("../../.env");

const userService = require("../service/user");
const tokenService = require("../service/token");
const { error, responseSender } = require("../util/script");

// Module scaffolding
const authorizationMiddleware = async (req, res, next) => {
    /**
     * TODO:*
     * Get the JWT token and verify it
     * if not return 401
     * then find the user by id from JWT payload
     * if the user's role is user then return 401
     * if the user's role is admin lookup the token db if the token is valid
     * if not valid return 401
     * otherwise call next()
     */
    const token =
        typeof req.headers.authorization === "string"
            ? req.headers.authorization.split(" ")[1]
            : null;
    if (!token) {
        responseSender(res, 401, { message: "Authorization required." });
    } else {
        let payload;
        try {
            payload = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            console.log(err.message);
            next(error(401, "Authorization failed."));
        } finally {
            if (payload) {
                const user = await userService.findByProp("_id", payload._id);
                if (!user) {
                    responseSender(res, 401, { message: "Unauthorized." });
                } else {
                    if (user._doc.role === "user") {
                        responseSender(res, 401, { message: "Unauthorized." });
                    } else if (user._doc.role === "admin") {
                        // TODO: lookup in the tokenDB by user._id
                        const tokenData = await tokenService.getTokenByAuthorId(
                            user._doc._id
                        );
                        if (tokenData._doc.token !== token) {
                            responseSender(res, 401, {
                                message: "Unauthorized.",
                            });
                        } else {
                            req.user = user;
                            next();
                        }
                    }
                }
            }
        }
    }
};

// Export module
module.exports = authorizationMiddleware;
