const { RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, text) => {
    const embed = new RichEmbed()
        .setColor(colors.green)
        .setDescription(`${text}`)
    req.message.channel.send(embed)
    logger.view('rendering view: ok')
}