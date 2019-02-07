const { RichEmbed } = require('discord.js')
const log = require('../utils/log.js')
const cast = require('../utils/cast.js')
const colors = require('../utils/colors.js')

exports.render = (req, user, lifetimeDkp, maxdkp, dkp, loots) => {
    log.view('rendering view: summary')
    let text = `**summary: ${cast.user(user)}**\n`
    text += `lifetime: ${lifetimeDkp}\n`
    text += `90 day: ${dkp}/${maxdkp} (${parseInt(dkp / maxdkp * 100)}%)\n`
    text += `loots:\n`
    loots.forEach(loot => {
        text += `${loot.date.toLocaleDateString()} ${loot.alt == true ? cast.role(loot.item) + '(alt)' : cast.role(loot.item)}` +
            ` raid: ${loot.raidid}\n`
    })
    const embed = new RichEmbed()
        .setColor(colors.lightblue)
        .setDescription(text)
    return req.message.channel.send(embed)
}