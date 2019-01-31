const { RichEmbed } = require('discord.js')
const log = require('../utils/log.js')
const cast = require('../utils/cast.js')
const colors = require('../utils/colors.js')

exports.render = async (req, maxdkp, tallies) => {
    log.view('rendering view: leaderboard')
    tallies.sort(function (a, b) { return b.value - a.value })
    cap = 50
    chunkCount = 1

    if (tallies.length > cap) {
        chunkCount = ~~(tallies.length / cap) + 1
    }
    chunkSize = tallies.length / chunkCount
    chunks = []
    embeds = []
    c = chunkCount
    while (c--) {
        chunks.unshift(tallies.slice(c * chunkCount, c * chunkCount + chunkSize))
    }
    chunks.forEach((chunk, num) => {
        let prettyTally = ''
        chunk.forEach((x, i) => {
            let name = `${isNaN(x.name) == true ? x.name : cast.user(x.name)}`
            prettyTally += `${((num * chunkCount) + i + 1).toString().padStart(2, '0')} ${name}: ${parseInt(x.value / maxdkp * 100)}% (${x.value}/${maxdkp})\n`
        })
        let embed = new RichEmbed()
            .setColor(colors.lightblue)
            .setDescription(`${(num == 0) ? '**leaderboard:**\n' : ''}${prettyTally}`)
        embeds.push(embed)
    })
    const promises = embeds.map(async (x) => {
        await req.message.channel.send(x)
    })
    await Promise.all(promises)
}