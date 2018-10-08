require('dotenv').config()
const logger = require('../utils/logger.js')
//views
const help_view = require('../views/help.js')

logger.ok('controllers/help loaded')

exports.run = async (req, matches) => {
    let roles = process.env.EDITOR_ROLES.split(',')
    let isAdmin = roles.some(x => {
        let role = req.message.guild.roles.find("name", x)
        if (role) {
            if (req.message.member.roles.has(role.id)) {
                return true;
            }
        }
    })
    let user = req.message.author.username

    let msg = `hail ${user}, i'm dkp bot. you can use special commands in discord to ask me about your dkp!\n\n`

    if (isAdmin) {
        msg += `parameters:\nn = any positive integer. example: 42\n` +
            `[x] = required value you must enter for the command to work\n` +
            `<x> = optional value the command will work with or without\n` +
            `@user = specifies a user using the mention syntax\n\n` +
            `get more info on any command by passing 'help' as the only parameter.\n` +
            `example: ?raids help\n\n` +
            `prefixes:\n` +
            `the first character in a command indicates its function.\n` +
            `! : command, + : create, ? : read, #:update, - : delete\n\n` +
            `commands:\n` +
            `!help\n` +
            //`!attendance [raid name]` +
            //`!dkp <@user>\n` +
            //`?loots <@user>\n` +
            //`?loots [item name]\n` +
            //`?loots/n\n` +
            //`?missing <@user>\n` +
            `?raids\n` +
            `?raids/n\n` +
            //`?raids/n/users\n` + //should delete this
            //`?raids/n/loots\n` + //should delete this   
            `+raids #raid-name, <YYYY-MM-DD>, <n>\n` +
            `+raids/n/users @user\n` +
            `+raids/n/loots @user, @item, true|false\n` + //fix to use this syntax
            //`#raids/n/name [raid name]\n` +
            //`#raids/n/date [nnnn-nn-nn]\n` +
            //`#raids/n/value [n]\n` +
            //`#loots/n/user [@user]\n` +
            //`#loots/n/item [item name]\n` +
            `-raids/n // needs work\n` +
            `-raids/n/users [@user] //needs work\n` +
            `-loots [n] //needs work\n`
    } else {
        msg += `commands:\n` +
            `!help\n` +
            //`!attendance [raid name]` +
            //`!dkp <@user>\n` +
            //`?loots <@user>\n` +
            //`?missing <@user>\n` +
            `?raids\n` +
            `?raids/n\n\n` +
            `parameters:\nn = any positive integer. example: 42\n\n` +
            //`[x] = required value you must enter for the command to work\n` +
            //`<x> = optional value the command will work with or without\n\n` +
            //`@user = specifies a user using the mention syntax\n\n` +
            `get more info on any command by passing 'help' as the only parameter.\n` +
            `example: ?raids help`

    }
    help_view.send(req, msg)
}

exports.help = function (req) {
    return this.run(req)
}

exports.roles = process.env.USER_ROLES

exports.test = async () => {
    logger.debug('command.test')
}