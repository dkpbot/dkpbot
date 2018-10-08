const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

logger.ok('views/help loaded')

exports.send = async (req, text) => {
    const embed = new RichEmbed()
        .setTitle(`help`)
        .setColor(colors.bluegrey)
        .setDescription(`${text}`)
    await req.message.channel.send(embed)
}