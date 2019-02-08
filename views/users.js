const { RichEmbed } = require('discord.js')
const moment = require('moment')
const log = require('../utils/log.js')
const colors = require('../utils/colors.js')

exports.render = (req, raid) => {
    const embed = new RichEmbed()
        .setColor(colors.cyan)
        .setDescription(`users: '${raid.event}' ${moment(raid.date).format('YYYY-MM-DD')}\n` +
            raid.users)
    req.message.channel.send(embed)
    log.view('rendering view: user')
}