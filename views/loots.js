const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')

logger.ok('views/loots loaded')

exports.send = async(req, raid) => {
    const embed = new RichEmbed()
        .setTitle(`loots: '${raid.description}' ${raid.date.toLocaleDateString()}`)
        .setColor(colors.cyan)
        .setDescription(
            raid.loots.map(x => {
            return `${x._id} '${x.item}' ${utils.findNickname(req, x.user)} ${x.alt || ''}`
        }))
    await req.message.channel.send(embed)
}