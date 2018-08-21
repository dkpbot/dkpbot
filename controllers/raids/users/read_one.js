const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/users/read_one loaded')

exports.run = async (req, matches) => {
    raids = await Raid.find({}, function(err) {
        if (err) return logger.error(err)
    }).sort({date:-1})
    let description = ''
    raids.forEach(x => {
        description += `${x._id} [${x.date.toLocaleDateString()}] '${x.description}'\n`
    })
    if(description.length >0){
        description.slice(0,-1)
    }
    const embed = new RichEmbed()
        .setTitle(`raids`)
        .setThumbnail('https://i.imgur.com/ephiFV7.png')
        .setColor(colors.cyan)
        .setDescription(description)
    let msg = await res.message.channel.send(embed)
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}