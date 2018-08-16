const logger = require('../utils/logger.js')

var routes = new Map();
routes.set(/raids$/, function(req, matches){
    console.log('hello world')
    //raids.read_all(bot, message, args)
})
routes.set(/raids\/(\d+)$/, function(req, matches){
    console.log('hello world')
    //raids.read_one(bot, message, matches[1], args)
})
routes.set(/raids\/(\d*)\/users$/, function(req, matches){
    console.log('hello world')
    //raids.read_users(bot, message, matches[1], args)
})

exports.route = function(req){
    logger.debug('routes > read')

    routes.forEach(function(value,key,map){
        let matches = req.command.match(key)
        if(matches){
            logger.route(`matched regex ${key}`)
            value(req, matches)
        }
    })
}