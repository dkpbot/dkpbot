const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../../utils/logger.js')
const colors = require('../../../utils/colors.js')
const utils = require('../../../utils/utils')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/users/read_all loaded')

exports.run = async (req, matches) => {
    let raid_id = matches[1]
    let r = await Raid.findOne({_id:raid_id}, function(err,doc) {
        if (err) return logger.error(err)

        //let nicknames = doc.users.map(x => utils.findNickname(x.id))
        let description = ''
        if(doc.users.length > 0){
            doc.users.forEach(id => {
                description += `${id} ${utils.findNickname(req.bot, req.message, id)}\n`
                description.slice(0,-1)
            })
        } else {
            description = 'no users found'
        }
        const embed = new RichEmbed()
            .setTitle(`users: '${doc.description}' ${doc.date.toLocaleDateString()}`)
            .setColor(colors.cyan)
            .setDescription(description)
        req.message.channel.send(embed)
    })
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}