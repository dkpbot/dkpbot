const { RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, text) => {
    logger.warn(text)
    const embed = new RichEmbed()
        .setColor(colors.amber)
        .setDescription(`${text}`)
    req.message.channel.send(embed)
    logger.view('rendering view: warning')
}