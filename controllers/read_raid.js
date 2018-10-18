const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
//views
const raid_view = require('../views/raid.js')
const help_view = require('../views/help.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
//const Loot = mongoose.model('Loot')
const Raid = mongoose.model('Raid')

exports.run = async (req, matches) => {
    let raid_id = matches[1]
    let r = await Raid.findOne({ _id: raid_id }, function (err) {
        if (err) return error_view.render(err)
    })
    if (!r) return warning_view.render(req, `raid ${raid_id} not found`)
    await raid_view.render(req, r)
}

exports.roles = process.env.USER_ROLES

exports.help = function (req) {
    let msg = `returns details of raid n.\n\n` +
        `usage: ?raids/n\n`
    help_view.render(req, msg)
}

exports.test = async (req, matches) => {

}