const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../../utils/logger.js')
const colors = require('../../../utils/colors.js')
const utils = require('../../../utils/utils')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/loots/read_all loaded')

exports.run = async (req, matches) => {
    let raid_id = matches[1]
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return logger.error(err)
    })
    logger.debug(JSON.stringify(r))
        //let nicknames = doc.users.map(x => utils.findNickname(x.id))
    let description = r.loots.map(x => {
        return `${x._id} '${x.item}' ${utils.findNickname(req.bot, req.message, x.user)} ${x.alt || ''}`
    })

    const embed = new RichEmbed()
        .setTitle(`loots: '${r.description}' ${r.date.toLocaleDateString()}`)
        .setColor(colors.cyan)
        .setDescription(description)
    req.message.channel.send(embed)
    
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}