const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')

logger.ok('views/raid loaded')

exports.send = async(req, raid) => {
    let nicknames = raid.users.map(x => utils.findNickname(req.bot, req.message, x)) 
    const embed = new RichEmbed()
    .setTitle(`raid: '${raid.description}' ${raid.date.toLocaleDateString()}`)
    .setColor(colors.cyan)
    .setDescription(`id: ${raid.id}\n` +
        `date: ${raid.date.toLocaleDateString()}\n` +
        `entered by: ${utils.findNickname(req.bot, req.message, raid.enteredby)}\n` +
        `value: ${raid.value}\n` +
        `users: [${nicknames}]\n` +
        `loots: [${raid.loots.map(x => x.item)}]`)
    await req.message.channel.send(embed)
}