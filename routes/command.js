const logger = require('../utils/logger.js')

var routes = new Map();
routes.set(/attendance$/, function(req, matches){
    console.log('hello world')
    const controller = require('../controllers/attendance/command.js')
    controller.run(req, matches)
})

exports.route = function(req){
    routes.forEach(function(value,key,map){
        let matches = req.command.match(key)
        if(matches){
            logger.route(`matched regex ${key}`)
            value(req, matches)
        }
    })
}