const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../../utils/logger.js')
const colors = require('../../../utils/colors.js')
const utils = require('../../../utils/utils')
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
    //logger.debug(matches);
    let raid_id = matches[1]
    let userid = utils.validateUser(user)
    if(!userid || userid === process.env.BOT) return req.message.channel.send(`invalid user`)
    //fetch raid
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return logger.error(err)
    })
    if(!r) {
        logger.warn(`invalid raid`)
        return req.message.channel.send(`invalid raid`)
    }
    logger.debug(JSON.stringify(r))
    //add loot!
    seq = await Sequence.findOneAndUpdate({_id:'loots'}, {$inc: {n:1}})
    r.loots.push({_id: seq.n, user: userid, item: item, alt: alt})
    await r.save( function(err, doc) {
        if (err) return logger.error(err)
        req.message.channel.send(`raid ${r._id} updated:\n` +
            `${utils.findNickname(req.bot, req.message, userid)} looted ${item}`)
    })
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}