const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')

logger.ok('views/raid loaded')

exports.send = async(req, raid) => {
    const embed = new RichEmbed()
    .setColor(colors.lightblue)
    .setDescription(`**raid: ${raid.description}**\n` +
        `id: ${raid.id}\n` +
        `date: ${raid.date.toLocaleDateString()}\n` +
        `entered by: ${raid.enteredby}\n` +
        `value: ${raid.value}\n` +
        `users: ${raid.users}\n` +
        `loots: ${raid.loots.map(x => `\n${x.id} ${x.user} ${x.item}`)}`) //figure out some way to indicate alt items
    //.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ38zarDr_qM48Qo_T9-C1OxHJ5MAkFfY18Aiy3-wz7i6qnACY1")
    await req.message.channel.send(embed)
}