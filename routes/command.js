const logger = require('../utils/logger.js')

var routes = new Map();
routes.set(/attendance$/, function(req, matches){
    console.log('hello world')
})

exports.route = function(req){
    logger.debug('routes > command')

    routes.forEach(function(value,key,map){
        let matches = req.command.match(key)
        if(matches){
            logger.route(`matched regex ${key}`)
            value(req, matches)
        }
    })
}