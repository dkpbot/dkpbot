const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

logger.ok('views/error loaded')

exports.send = async(req, err) => {
    logger.error(err.stack)
    const embed = new RichEmbed()
    .setTitle(`error:`)
    .setColor(colors.red)
    .setDescription(`${err}`)
    await req.message.channel.send(embed)
}