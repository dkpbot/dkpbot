const { RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, text) => {
    const embed = new RichEmbed()
        .setTitle(`help`)
        .setColor(colors.bluegrey)
        .setDescription(`${text}`)
    req.message.channel.send(embed)
    logger.view('rendering view: help')
}