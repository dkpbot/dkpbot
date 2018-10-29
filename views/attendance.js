const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, raid_name) => {
    logger.view('rendering view: attendance')
    const embed = new RichEmbed()
        .setColor(colors.purple)
        .setDescription(`**taking attendance for ${raid_name}**\n` +
            'THUMBS UP to get credit')
    return req.message.channel.send(embed)
}