const { RichEmbed } = require('discord.js')
const log = require('../utils/log.js')
const cast = require('../utils/cast.js')
const colors = require('../utils/colors.js')

exports.render = (req, maxdkp, tallies) => {
    log.view('rendering view: leaderboard')
    tallies.sort(function (a, b) { return b.value - a.value })
    let prettyTally = ''
    tallies.forEach(function (x, i) {
        let name = `${isNaN(x.name) == true ? x.name : cast.user(x.name)}`
        prettyTally += `${i + 1}) ${name}: ${parseInt(x.value / maxdkp * 100)}% (${x.value}/${maxdkp})\n`
    })
    const embed = new RichEmbed()
        .setColor(colors.lightblue)
        .setDescription(`**leaderboard:**\n` +
            `${prettyTally}`)
    return req.message.channel.send(embed)
}