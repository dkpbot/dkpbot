require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
//views
const raids_view = require('../views/raids.js')
const help_view = require('../views/help.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/read_all loaded')

exports.run = async (req, matches) => {
    raids = await Raid.find({}, function(err) {
        if (err) return error_view.send(req, err)
    }).sort({date:-1})
    raids_view.send(req, raids)
}

exports.roles = process.env.USER_ROLES

exports.help = async (req) => {
    help_view.send(req, 'usage: ?raids')
}

exports.test = async (req, matches) => {
    
}