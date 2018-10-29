const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
const validate = require('../utils/validate.js')
//views
const ok_view = require('../views/ok.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

exports.run = async (req, matches) => {
    //validate args
    let raidId = req.args
    if (raidId.trim() === '') return warning_view.render(req, 'invalid raid')
    if (isNaN(raidId)) return warning_view.render(req, 'invalid raid')

    //delete raid
    let raid = await Raid.findByIdAndDelete(raidId, function (err) {
        if (err) return error_view.render(req, err)
    })
    if (raid) return ok_view.render(req, `raid ${raidId} deleted`)
    return warning_view.render(req, `raid ${raidId} does not exist`)
}

exports.help = async (req, matches) => {

}

exports.test = async (req, matches) => {

}