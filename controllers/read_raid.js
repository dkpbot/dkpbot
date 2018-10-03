const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
//views
const raid_view = require('../views/raid.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/read_one loaded')

exports.run = async (req, matches) => {
    let raid_id = matches[1]
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return error_view.send(err)
    })
    if(!r) return warning_view.send(req, `raid ${raid_id} not found`)
    await raid_view.send(req, r)
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}