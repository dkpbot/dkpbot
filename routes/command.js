const logger = require('../utils/logger.js')
routes = {}
routes
exports.route = function(req){
    console.log('command route')

    var attendance = require('../controllers/attendance')
    logger.route(`attendance > run`)
    attendance.run(bot, message, command, args)
}