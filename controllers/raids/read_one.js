const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../utils/logger.js')
const colors = require('../../utils/colors.js')
const utils = require('../../utils/utils')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/read_one loaded')

exports.run = async (req, matches) => {
    let raid_id = matches[1]
    let r = await Raid.findOne({_id:raid_id}, function(err,doc) {
        if (err) return logger.error(err)
        if(!doc){
            logger.warn(`invalid raid`)
            return req.message.channel.send(`invalid raid`)
        }
        let nicknames = doc.users.map(x => utils.findNickname(req.bot, req.message, x)) 
        const embed = new RichEmbed()
        .setTitle(`raid: '${doc.description}' ${doc.date.toLocaleDateString()}`)
        .setColor(colors.cyan)
        .setDescription(`id: ${doc.id}\n` +
                        //`date: ${doc.date.toLocaleDateString()}\n` + //date is already in the title
                        `entered by: ${utils.findNickname(req.bot, req.message, doc.enteredby)}\n` +
                        `value: ${doc.value}\n` +
                        `users: [${nicknames}]\n` +
                        `loots: [${doc.loots}]`)
        req.message.channel.send(embed)
    })
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}