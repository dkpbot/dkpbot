const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../../utils/logger.js')
const colors = require('../../../utils/colors.js')
const utils = require('../../../utils/utils')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/users/delete loaded')

exports.run = async (req, matches) => {
    //validate args
    logger.debug(matches);
    let raid_id = matches[1]
    let user = utils.validateUser(req.args)
    if(!user || user === process.env.BOT) return req.message.channel.send(`invalid user`)
    //fetch raid
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return logger.error(err)
    })
    if(!r) {
        logger.warn(`invalid raid`)
        return req.message.channel.send(`invalid raid`)
    }
    //remove user
    let index = r.users.indexOf(user)
    if(index === -1){
        return req.message.channel.send(`user did not attend this raid`)
    } else{
        r.users.splice(index,1)
        await r.save( function(err, doc) {
            if (err) return logger.error(err)
            req.message.channel.send(`removed ${utils.findNickname(req.bot, req.message, user)} ` +
                                    `from raid '${r.description}' ${r.date.toLocaleDateString()}`)
        })
    }
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}