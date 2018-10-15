const validate = require('./utils/validate.js')
const logger = require('./utils/logger.js')
require('dotenv').config()
//views
const warning_view = require('./views/warning.js')

const routes = []
function addRoute(pattern, controller, access) {
    routes.push({ pattern: pattern, controller: controller, access: access })
}
addRoute(/\!help$/, './controllers/help', 'all')
addRoute(/\?raids$/, './controllers/list_raids', 'user')
addRoute(/\?raids\/(\d+)$/, './controllers/read_raid', 'user')
addRoute(/\!attendance$/, './controllers/attendance', 'editor')
addRoute(/\+raids$/, './controllers/add_raid', 'editor')
addRoute(/\+raids\/(\d*)\/loots$/, './controllers/add_raid_loot', 'editor')
addRoute(/-raids\/(\d*)\/users$/, './controllers/remove_raid_user', 'editor')
addRoute(/\+item$/, './controllers/add_item', 'owner')
addRoute(/\!uninit$/, './controllers/un_init', 'owner')
addRoute(/\!init$/, './controllers/init', 'owner')
addRoute(/\!migrate$/, './controllers/migrate', 'owner')

function can_access(req, access) {
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

exports.route = function (req) {
    routes.some(x => {
        let matches = req.command.match(x.pattern)
        if (matches) {
            logger.route(`matched regex ${x.patter}`)
            if (!can_access(req, x.access)) return warning_view.send(req, "insufficient permissions")
            let controller = require(x.controller)
            if (req.args === 'help') {
                controller.help(req)
            }
            else {
                controller.run(req, matches)
            }
            return true
        }
    })
}

exports.test = function (req) {

}