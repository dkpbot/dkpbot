require('dotenv').config()
const logger = require('../utils/logger.js')
//views
const help_view = require('../views/help.js')

const allResponse = function (req) {
    let user = req.message.author.username
    let msg = `hail ${user}, unfortunately you don't have permission to use my services.`
    help_view.render(req, msg)
}
const userResponse = function (req) {
    let user = req.message.author.username
    let msg = `hail ${user}, i'm dkp bot. you can use special commands in discord to ask me about your dkp!\n\n` +
        `commands:\n` +
        `!help\n` +
        `!summary <@user>\n` +
        `?raids\n` +
        `?raids/n`
    help_view.render(req, msg)
}
const editorResponse = function (req) {
    let user = req.message.author.username
    let msg = `hail ${user}, i'm dkp bot. you can use special commands in discord to ask me about your dkp!\n\n` +
        `parameters:\nn = any positive integer. example: 42\n` +
        `[x] = required value you must enter for the command to work\n` +
        `<x> = optional value the command will work with or without\n` +
        `@user = specifies a user using the mention syntax\n\n` +
        `get more info on any command by passing 'help' as the only parameter.\n` +
        `example: ?raids help\n\n` +
        `prefixes:\n` +
        `the first character in a command indicates its function.\n` +
        `! : command, + : create, ? : read, *:update, - : delete\n\n` +
        `commands:\n` +
        `!help\n` +
        `!summary <@user>\n` +
        `!attendance [raid name]\n` +
        //`?loots <@user>\n` +
        //`?loots [item name]\n` +
        //`?loots/n\n` +
        //`?missing <@user>\n` +
        `?raids\n` +
        `?raids/n\n` +
        `+raids #raid-name, <YYYY-MM-DD>, <n>\n` +
        `+raids/n/users @user\n` +
        `+raids/n/loots @user, @item, <main/alt>\n` +
        //`#raids/n/name [raid name]\n` +
        //`#raids/n/date [nnnn-nn-nn]\n` +
        //`#raids/n/value [n]\n` +
        //`#loots/n/user [@user]\n` +
        //`#loots/n/item [item name]\n` +
        `-raids/n // needs work\n` +
        `-raids/n/users @user //needs work\n` +
        `-raids/n/loots n //needs work\n`
    help_view.render(req, msg)
}
const ownerResponse = function (req) {
    return editorResponse(req)
}

exports.run = async (req, matches) => {
    if (process.env.OWNER === `<@${req.message.author.id}>`) {
        return ownerResponse(req)
    }
    let editorRoles = process.env.EDITOR_ROLES.split(',')
    editorResponse = editorRoles.some(x => {
        let role = req.message.guild.roles.find("name", x)
        if (role) {
            if (req.message.member.roles.has(role.id)) {
                return true;
            }
        }
    })
    if (editorResponse) return editorResponse(req)

    let userRoles = process.env.USER_ROLES.split(',')
    isUser = userRoles.some(x => {
        let role = req.message.guild.roles.find("name", x)
        if (role) {
            if (req.message.member.roles.has(role.id)) {
                return true;
            }
        }
    })
    if (isUser) return userResponse(req)
    return allResponse(req)
}

exports.help = function (req) {
    return this.run(req)
}

exports.test = async () => {
    logger.debug('command.test')
}