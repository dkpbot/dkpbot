const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

logger.ok('views/warning loaded')

exports.send = async(req, text) => {
    logger.warn(text)
    const embed = new RichEmbed()
    .setColor(colors.amber)
    .setDescription(`${text}`)
    await req.message.channel.send(embed)
}