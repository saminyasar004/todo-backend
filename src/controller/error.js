/**
 * Title: Default error controller
 * Description:
 * Author: Samin Yasar
 * Date: 28/June/2022
 */

// Dependencies
const { responseSender } = require("../util/script");

// Module scaffolding
const errorController = (err, _req, res, _next) => {
    let status = err.status ? err.status : 500;
    let message = null;
    if (!err.status) {
        // ? error occures in the server side
        message = "Error occures in the server side.";
        console.log(err.message);
    } else {
        message = err.message;
    }
    responseSender(res, status, { message });
};

// Export module
module.exports = errorController;
