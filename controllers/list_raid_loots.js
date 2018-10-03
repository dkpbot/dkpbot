const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils.js')
//views
const loots_view = require('../views/loots.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/loots/read_all loaded')

exports.run = async (req, matches) => {
    let raid_id = matches[1]
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return error_view(req, err)
    })
    loots_view.send(req, r)  
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}