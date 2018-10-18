const { RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, raid) => {
    const embed = new RichEmbed()
        .setColor(colors.cyan)
        .setDescription(`users: '${raid.event}' ${raid.date.toLocaleDateString()}\n` +
            raid.users)
    req.message.channel.send(embed)
    logger.view('rendering view: user')
}