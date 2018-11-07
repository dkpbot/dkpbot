const { Client, RichEmbed } = require('discord.js')
const log = require('../utils/log.js')
const cast = require('../utils/cast.js')
const colors = require('../utils/colors.js')

exports.render = (req, event) => {
    log.view('rendering view: attendance')
    const embed = new RichEmbed()
        .setColor(colors.purple)
        .setDescription(`**taking attendance for ${cast.channel(event)}**\n` +
            'THUMBS UP to get credit')
    return req.message.channel.send(embed)
}