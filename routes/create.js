const logger = require('../utils/logger.js')

var routes = new Map();
routes.set(/raids$/, function(req, matches){
    console.log('hello world')
})
routes.set(/raids\/(\d*)\/users$/, function(req, matches){
    console.log('hello world')
})
exports.route = function(req){
    console.log('create route')

    routes.forEach(function(value,key,map){
        let matches = req.command.match(key)
        if(matches){
            logger.route(`matched regex ${key}`)
            value(req, matches)
        }
    })
    //routes.forEach(function() { console.log('foreach')})
     //command starts with +
    // only use on collections

    //?raids
    /*var regex = /raids$/
    var matches = command.match(regex)
    if(matches){
        logger.route(`raids > create`)
        //return raids.read_all(bot, message, args)
    }
    //raids/123/users
    regex = /raids\/(\d*)\/users$/
    matches = command.match(regex)
    if(matches){
        logger.route(`raids > create_user ${matches[1]}`)
        return raids.add_user(bot, message, matches[1], args)
    }*/
}