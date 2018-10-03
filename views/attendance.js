const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')

logger.ok('views/attendance loaded')

exports.send = async(req, raid_name) => {
    const embed = new RichEmbed()
        .setTitle(`taking attendance for '${raid_name}'`)
        .setColor(colors.amber)
        .setDescription('THUMBS UP to get credit')
    return req.message.channel.send(embed)
}