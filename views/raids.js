const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')

logger.ok('views/raids loaded')

exports.send = async(req, raids) => {
    const embed = new RichEmbed()
        .setTitle(`raids`)
        .setColor(colors.lightblue)
        .setDescription(
            raids.map(x => {
            return `${x.id} [${x.date.toLocaleDateString()}] '${x.description}'`
        }))
    await req.message.channel.send(embed)
}