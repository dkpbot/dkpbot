const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')

logger.ok('views/loots loaded')

exports.send = async(req, raid) => {
    const embed = new RichEmbed()
        .setColor(colors.cyan)
        .setDescription(
            `**loots: '${raid.description}' ${raid.date.toLocaleDateString()}**\n` +
            raid.loots.map(x => {
            return `${x._id} '${x.item}' ${x.user} ${x.alt || ''}`
        }).join('\n'))
    await req.message.channel.send(embed)
}