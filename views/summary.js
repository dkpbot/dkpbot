const { RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, user, maxdkp, dkp, loots) => {
    let text = `**summary: ${user}**\n`
    text += `attendance: ${dkp}/${maxdkp} (${parseInt(dkp / maxdkp * 100)}%)\n`
    text += `loots:\n`
    loots.forEach(loot => {
        text += `${loot.date.toLocaleDateString()} ${loot.alt == true ? loot.item + '(alt)' : loot.item}\n`
    })
    const embed = new RichEmbed()
        .setColor(colors.lightblue)
        .setDescription(text)
    req.message.channel.send(embed)
    logger.view('rendering view: dkp')
}