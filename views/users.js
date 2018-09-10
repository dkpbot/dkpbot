const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')

logger.ok('views/users loaded')

exports.send = async(req, raid) => {
    const embed = new RichEmbed()
        .setTitle(`users: '${raid.description}' ${raid.date.toLocaleDateString()}`)
        .setColor(colors.cyan)
        .setDescription(
            raid.users.map(x => {
            return `${x} ${utils.findNickname(req.bot, req.message, x)}`
        }))
    await req.message.channel.send(embed)
}