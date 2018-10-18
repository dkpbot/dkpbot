const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, raid_name) => {
    const embed = new RichEmbed()
        .setColor(colors.purple)
        .setDescription(`**taking attendance for ${raid_name}**\n` +
            'THUMBS UP to get credit')
    req.message.channel.send(embed)
    logger.view('rendering view: attendance')
}