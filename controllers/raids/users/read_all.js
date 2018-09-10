const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../../utils/logger.js')
const colors = require('../../../utils/colors.js')
const utils = require('../../../utils/utils')
//views
const users_view = require('../../../views/users.js')
const warning_view = require('../../../views/warning.js')
const error_view = require('../../../views/error.js')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/users/read_all loaded')

exports.run = async (req, matches) => {
    let raid_id = matches[1]
    let r = await Raid.findOne({_id:raid_id}, function(err,doc) {
        if (err) return error_view.send(req, err)
    })
    //if(!r) return warning_view.send(req,)
    users_view.send(req, r) 
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}