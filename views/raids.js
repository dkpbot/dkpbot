const { RichEmbed } = require('discord.js')
const moment = require('moment')
const log = require('../utils/log.js')
const cast = require('../utils/cast.js')
const colors = require('../utils/colors.js')

exports.render = (req, raids) => {
    const embed = new RichEmbed()
        .setTitle(`raids`)
        .setColor(colors.lightblue)
        .setDescription(
            raids.map(x => {
                return `${x.id} [${moment(x.date).format('YYYY-MM-DD')}] ${cast.channel(x.event)}`
            }))
    req.message.channel.send(embed)
    log.view('rendering view: raids')
}