/**
 * Title: Custom utilities
 * Description:
 * Author: Samin Yasar
 * Date: 28/June/2022
 */

// Dependencies

// Module scaffolding
const util = {};

/**
 * Creates an custom error.
 *
 * @param {Number} status
 * @param {String} message
 * @returns {Error}
 */
util.error = (status, message) => {
    const statusCode = typeof status === "number" ? status : 500;
    const msg =
        typeof message === "string"
            ? message
            : "Error occures in the server side.";
    const error = new Error(msg);
    error.status = statusCode;
    return error;
};

/**
 * Send formatted response to the client
 *
 * @param {Response} res
 * @param {Number} status
 * @param {Object} payload
 */
util.responseSender = (res, status, payload) => {
    const statusCode = typeof status === "number" ? status : 500;
    const payloadObj =
        typeof payload === "object"
            ? payload
            : { message: "Error occures in the server side." };
    res.setHeader("Content-Type", "application/json");
    res.status(statusCode).json(payloadObj);
};

// Export module
module.exports = util;
