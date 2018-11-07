require('dotenv').config()
const log = require('./utils/log.js')
//views
const warning_view = require('./views/warning.js')

let routes = []

const canAccess = function (req, access) {
    if (access == 'all') return true
    if (access == 'user') {
        let userRoles = process.env.USER_ROLES.split(',')
        return userRoles.some(userRole => {
            let role = req.message.guild.roles.find(x => x.name === userRole)
            if (role) {
                if (req.message.member.roles.has(role.id)) {
                    return true;
                }
            }
        })
    }
    if (access == 'editor') {
        let editorRoles = process.env.EDITOR_ROLES.split(',')
        return editorRoles.some(editorRole => {
            let role = req.message.guild.roles.find(x => x.name === editorRole)
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
            route.run(req, matches)
            return true
        }
    })
}

exports.test = function (req) {

}