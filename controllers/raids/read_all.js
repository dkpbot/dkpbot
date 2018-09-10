const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../utils/logger.js')
const colors = require('../../utils/colors.js')
const utils = require('../../utils/utils')
//views
const raids_view = require('../../views/raids.js')
const warning_view = require('../../views/warning.js')
const error_view = require('../../views/error.js')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/read_all loaded')

exports.run = async (req, matches) => {
    raids = await Raid.find({}, function(err) {
        if (err) return error_view.send(req, err)
    }).sort({date:-1})
    raids_view.send(req, raids)
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}