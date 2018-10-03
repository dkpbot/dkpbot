const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils.js')
//views
//const loot_view = require('../../../views/loot.js')
const ok_view = require('../views/ok.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

logger.ok('controllers/raids/loots/create loaded')

exports.run = async (req, matches) => {
    //parse args
    let args = req.args.split(',')
    let item = args.shift().trim().toLowerCase().replace(/\"|\'/g,'')
    let user = args.shift()
    if(user) {
        user = user.trim()
    }
    let alt = args.shift() || false
    logger.debug(`item: ${item}`)
    logger.debug(`user: ${user}`)  
    logger.debug(`alt: ${alt}`)

    //validate args
    let raid_id = matches[1]
    let userid = utils.validateUser(user)
    if(!userid || userid === process.env.BOT) return warning_view.send(req, "invalid user")
    //fetch raid
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return error_view.send(req, err)
    })
    if(!r) return warning_view.send(req, "invalid raid")

    //add loot
    seq = await Sequence.findOneAndUpdate({_id:'loots'}, {$inc: {n:1}})
    r.loots.push({_id: seq.n, user: userid, item: item, alt: alt})
    await r.save( function(err) {
        if (err) return error_view.send(req, err)
        ok_view.send(req, 
            `raid ${r._id} updated:\n` +
            `${utils.findNickname(req.bot, req.message, userid)} looted ${item}`)
    })
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}