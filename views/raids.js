const { RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, raids) => {
    const embed = new RichEmbed()
        .setTitle(`raids`)
        .setColor(colors.lightblue)
        .setDescription(
            raids.map(x => {
                return `${x.id} [${x.date.toLocaleDateString()}] ${x.event}`
            }))
    req.message.channel.send(embed)
    logger.view('rendering view: raids')
}