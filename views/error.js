const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

logger.ok('views/error loaded')

exports.send = async(req, text) => {
    logger.error(text)
    const embed = new RichEmbed()
    .setTitle(`error:`)
    .setColor(colors.red)
    .setDescription(`${text}`)
    await req.message.channel.send(embed)
}