const logger = require('../utils/logger.js')
exports.command = (bot, message, command, args) => {
    var attendance = require('../controllers/attendance')
    logger.route(`attendance > run`)
    attendance.run(bot, message, command, args)
  }