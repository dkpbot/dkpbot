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
    raids = await Raid.find({}, function (err) {
        if (err) return error_view.send(req, err)
    }).sort({ date: -1 }).limit(50)
    raids_view.send(req, raids)
}

exports.help = function (req) {
    let msg = `lists most recent raids\n\n` +
        `usage: ?raids\n`
    help_view.send(req, msg)
}

exports.test = async (req, matches) => {

}