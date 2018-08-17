const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../../utils/logger.js')
const colors = require('../../../utils/colors.js')
const utils = require('../../../utils/utils')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/users/create loaded')

exports.run = async (req, matches) => {
    //validate args
    logger.debug(matches);
    let raid_id = matches[1]
    let user = utils.validateUser(req.args)
    if(!user) return req.message.channel.send(`invalid user`)
    if(user === process.env.BOT){
        return req.message.channel.send(`BEEP BOOP. robots can't attend raids`)
    }
    //fetch raid
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return logger.error(err)
    })
    if(!r) {
        logger.warn(`raid ${raid_id} not found`)
        return req.message.channel.send(`raid ${raid_id} not found`)
    }
    //add user
    if(r.users.indexOf(user) === -1){
        r.users.push(user)

        await r.save( function(err, doc) {
            if (err) return logger.error(err)
            req.message.channel.send(`added ${utils.findNickname(req.bot, req.message, user)} ` +
                                    `to raid '${r.description}' ${r.date.toLocaleDateString()}`)
        })
    }else{
        return req.message.channel.send(`user is already attending this raid`)
    }
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}