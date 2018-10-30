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
    let id = req.args
    if (id.trim() === '') return warning_view.render(req, 'invalid raid')
    if (isNaN(id)) return warning_view.render(req, 'invalid raid')

    //delete raid
    let raid = await Raid.findOne({ _id: id }, function (err, res) {
        if (err) return error_view.render(req, err)
    })
    logger.debug(raid)
    if (raid) {
        await Raid.deleteOne({ _id: id }, function (err, res) {
            if (err) return error_view.render(req, err)
        })
    }
    else {
        return warning_view.render(req, `raid ${id} does not exist`)
    }
    return ok_view.render(req, `raid ${id} deleted`)

}

exports.help = async (req, matches) => {

}

exports.test = async (req, matches) => {

}