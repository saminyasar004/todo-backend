/**
 * Title: Token service related stuff
 * Description:
 * Author: Samin Yasar
 * Date: 30/June/2022
 */

// Dependencies
const tokenModel = require("../model/Token");

// Module scaffolding
const tokenService = {};

/**
 * Lookup in the token database in the basis of author id
 *
 * @param {String} authorId
 * @returns {Promise}
 */
tokenService.getTokenByAuthorId = (authorId) => {
    return tokenModel.findOne({ authorId: authorId });
};

/**
 * Save a new token with author id in token DB
 *
 * @param {String} token
 * @param {String} authorId
 * @returns {Promise}
 */
tokenService.issueToken = async (token, authorId) => {
    let tokenData = await tokenService.getTokenByAuthorId(authorId);
    if (!tokenData) {
        tokenData = new tokenModel({ token, authorId });
        return tokenData.save();
    } else {
        // tokenModel.findOneAndUpdate({auhtorId: authorId}, {token: token})
        return tokenData.updateOne({ token: token });
    }
};

// Export module
module.exports = tokenService;
