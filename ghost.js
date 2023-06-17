const utils = require("./utils");
const config = require("./config");
const log = require("./log");
const handler = require("./handler");
const fireBase = require("./firebase");
module.exports = {
    config: config,
    botToken: config.bot.botToken,
    admin: config.bot.admin,
    price: config.price,
    apiKey: config.apiKey,
    getRepl: utils.getRepl,
    ghost: utils.ghost,
    validateDOBFormat: utils.validateDOBFormat,
    validateNIDFormat: utils.validateNIDFormat,
    isValidUbrn: utils.isValidUbrn,
    isValidDate: utils.isValidDate,
    api: utils.api,
    errorHandler: utils.errorHandler,
    event: handler.event,
    handleText: handler.handleText,
    getBotInfo: handler.getBotInfo,
    logUserData: log.logUserData,
    createUser: fireBase.createUser,
    updateCoinAmount: fireBase.updateCoinAmount,
    getMe: fireBase.getMe,
    checkBalance: fireBase.checkBalance,
    currentBal: fireBase.currentBal,
    balanceCheck: fireBase.balanceCheck,
    countRegisteredUsers: fireBase.countRegisteredUsers,
    getAllUserIds: fireBase.getAllUserIds
};
