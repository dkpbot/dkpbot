const logger = require('../utils/logger.js')

var routes = new Map();
routes.set(/raids$/, function(req, matches){
    const controller = require('../controllers/raids/read_all.js')
    controller.run(req, matches)
})
routes.set(/raids\/(\d+)$/, function(req, matches){ 
    const controller = require('../controllers/raids/read_one.js')
    controller.run(req, matches)
})
routes.set(/raids\/(\d*)\/users$/, function(req, matches){
    const controller = require('../controllers/raids/users/read_all')
    controller.run(req, matches)
})
routes.set(/raids\/(\d*)\/loots$/, function(req, matches){
    const controller = require('../controllers/raids/loots/read_all')
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