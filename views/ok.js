const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

logger.ok('views/ok loaded')

exports.send = async(req, text) => {
    const embed = new RichEmbed()
    .setColor(colors.green)
    .setDescription(`${text}`)
    await req.message.channel.send(embed)
}