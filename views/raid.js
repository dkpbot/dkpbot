const { RichEmbed } = require('discord.js')
const moment = require('moment')
const log = require('../utils/log.js')
const cast = require('../utils/cast.js')
const colors = require('../utils/colors.js')

exports.render = (req, raid) => {
    let enteredby = isNaN(raid.enteredby) == true ? raid.enteredby : cast.user(raid.enteredby)
    let users = raid.users.map(user => {
        return isNaN(user) == true ? user : cast.user(user)
    })
    let loots = raid.loots.map(loot => {
        let user = isNaN(loot.user) == true ? loot.user : cast.user(loot.user)
        let item = loot.alt == true ? `${cast.role(loot.item)} (alt)` : cast.role(loot.item)
        return `\n${loot.id} ${user} ${item}`
    })
    let date = moment(raid.date)
    console.log(date.format())
    console.log(raid.date.toString())

    let hours = raid.date.getHours()
    let minutes = raid.date.getMinutes()
    const embed = new RichEmbed()
        .setColor(colors.lightblue)
        .setDescription(`**raid: ${cast.channel(raid.event)}**\n` +
            `id: ${raid.id}\n` +
            `date: ${raid.date.toLocaleDateString()}\n` +
            `time: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}\n` +
            `entered by: ${enteredby}\n` +
            `value: ${raid.value}\n` +
            `users: ${users}\n` +
            `loots: ${loots}`
        )
    //.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ38zarDr_qM48Qo_T9-C1OxHJ5MAkFfY18Aiy3-wz7i6qnACY1")
    req.message.channel.send(embed)
    log.view('rendering view: raid')
}