const logger = require('../utils/logger.js')

var routes = new Map();
routes.set(/raids$/, function(req, matches){
    console.log('hello world')
    //raids.read_all(bot, message, args)
})
routes.set(/raids\/(\d*)\/users$/, function(req, matches){
    console.log('hello world')
    //raids.add_user(bot, message, matches[1], args)
})

exports.route = function(req){
    logger.debug('routes > create')

    routes.forEach(function(value,key,map){
        let matches = req.command.match(key)
        if(matches){
            logger.route(`matched regex ${key}`)
            value(req, matches)
        }
    })
}