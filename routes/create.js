const logger = require('../utils/logger.js')

var routes = new Map();
routes.set(/raids$/, function(req, matches){
    const controller = require('../controllers/raids/create')
    controller.run(req, matches)
})
routes.set(/raids\/(\d*)\/users$/, function(req, matches){
    const controller = require('../controllers/raids/users/create')
    controller.run(req, matches)
})
routes.set(/raids\/(\d*)\/loots$/, function(req, matches){
    const controller = require('../controllers/raids/loots/create')
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