const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')

logger.ok('views/users loaded')

exports.send = async (req, raid) => {
    const embed = new RichEmbed()
        .setColor(colors.cyan)
        .setDescription(`users: '${raid.event}' ${raid.date.toLocaleDateString()}\n` +
            raid.users)
    await req.message.channel.send(embed)
}