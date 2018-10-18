require('dotenv').config()
const logger = require('./utils/logger.js')
//views
const warning_view = require('./views/warning.js')

let routes = []

const canAccess = function (req, access) {
    if (access == 'all') return true
    if (access == 'user') {
        let roles = process.env.USER_ROLES.split(',')
        return roles.some(x => {
            let role = req.message.guild.roles.find("name", x)
            if (role) {
                if (req.message.member.roles.has(role.id)) {
                    return true;
                }
            }
        })
    }
    if (access == 'editor') {
        let roles = process.env.EDITOR_ROLES.split(',')
        return roles.some(x => {
            let role = req.message.guild.roles.find("name", x)
            if (role) {
                if (req.message.member.roles.has(role.id)) {
                    return true;
                }
            }
        })
    }
    if (access == 'owner') {
        return process.env.OWNER === `<@${req.message.author.id}>`
    }
}

exports.add = function (pattern, file, access) {
    let controller = require(file)
    route = {
        pattern: pattern,
        run: controller.run,
        help: controller.help,
        access: access
    }
    routes.push(route)
}

exports.route = function (req) {
    routes.some(route => {
        let matches = req.command.match(route.pattern)
        if (matches) {
            if (!canAccess(req, route.access)) return warning_view.render(req, "insufficient permissions")
            if (req.args === 'help') {
                //controller.help(req)
            }
            else {
                route.run(req, matches)
            }
            return true
        }
    })
}

exports.test = function (req) {

}