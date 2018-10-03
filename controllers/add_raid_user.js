const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils.js')
//views
const users_view = require('../views/users.js')
const ok_view = require('../views/ok.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/users/create loaded')

exports.run = async (req, matches) => {
    //validate args
    logger.debug(matches);
    let raid_id = matches[1]
    let user = utils.validateUser(req.args)
    if(!user || user === process.env.BOT) return warning_view.send(req, "invalid user")
    //fetch raid
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return error_view.send(req, err)
    })
    if(!r) return warning_view.send(req, "invalid raid")

    //add user
    if(!r.users.includes(user)){
        r.users.push(user)

        await r.save(function(err) {
            if (err) return error_view.send(req, err)
            return ok_view.send(req, 
                `added ${utils.findNickname(req.bot, req.message, user)} ` +
                `to raid ${r._id} '${r.description}'`)
        })
    }else{
        return warning_view.send(req, "user is already attending this raid")
    }
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}