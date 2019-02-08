const { RichEmbed } = require('discord.js')
const moment = require('moment')
const log = require('../utils/log.js')
const colors = require('../utils/colors.js')

exports.render = (req, raid) => {
    const embed = new RichEmbed()
        .setColor(colors.cyan)
        .setDescription(
            `**loots: '${raid.event}' ${moment(raid.date).format('YYYY-MM-DD')}**\n` +
            raid.loots.map(x => {
                return `${x._id} '${x.item}' ${x.user} ${x.alt || ''}`
            }).join('\n'))
    req.message.channel.send(embed)
    log.view('rendering view: loots')
}