const { RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')

exports.render = (req, raid) => {
    const embed = new RichEmbed()
        .setColor(colors.lightblue)
        .setDescription(`**raid: ${raid.event}**\n` +
            `id: ${raid.id}\n` +
            `date: ${raid.date.toLocaleDateString()}\n` +
            `entered by: ${raid.enteredby}\n` +
            `value: ${raid.value}\n` +
            `users: ${raid.users}\n` +
            `loots: ${raid.loots.map(x => `\n${x.id} ${x.user} ${x.alt == true ? x.item + '(alt)' : x.item}`)}`
        )
    //.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ38zarDr_qM48Qo_T9-C1OxHJ5MAkFfY18Aiy3-wz7i6qnACY1")
    req.message.channel.send(embed)
    logger.view('rendering view: raid')
}