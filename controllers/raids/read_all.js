const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../utils/logger.js')
const colors = require('../../utils/colors.js')
const utils = require('../../utils/utils')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/read_all loaded')

exports.run = async (req, matches) => {
    raids = await Raid.find({}, function(err) {
        if (err) return logger.error(err)
    }).sort({date:-1})
    let description = raids.map(x => {
        return `${x.id} [${x.date.toLocaleDateString()}] '${x.description}'`
    })
    
    const embed = new RichEmbed()
        .setTitle(`raids`)
        //.setThumbnail('https://i.imgur.com/ephiFV7.png')
        .setColor(colors.cyan)
        .setDescription(description.join('\n'))
    let msg = await req.message.channel.send(embed)
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}