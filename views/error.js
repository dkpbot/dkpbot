const { RichEmbed } = require('discord.js')
const log = require('../utils/log.js')
const colors = require('../utils/colors.js')

exports.render = (req, err) => {
    const embed = new RichEmbed()
        .setTitle(`error:`)
        .setColor(colors.red)
        .setDescription(`${err}`)
    req.message.channel.send(embed)
    log.view('rendering view: error')
    log.error(err.stack)

}