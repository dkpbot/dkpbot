const logger = require('../utils/logger.js')

module.exports.run = function (bot, err) {
    logger.error(`${JSON.stringify(err)}`)
}