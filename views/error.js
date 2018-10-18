const { RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, err) => {
    const embed = new RichEmbed()
        .setTitle(`error:`)
        .setColor(colors.red)
        .setDescription(`${err}`)
    req.message.channel.send(embed)
    logger.view('rendering view: error')
    logger.error(err.stack)

}