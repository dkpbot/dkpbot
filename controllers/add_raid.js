const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
const moment = require("moment")
const validate = require('../utils/validate.js')
//views
const ok_view = require('../views/ok.js')
const raid_view = require('../views/raid.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

logger.ok('controllers/add_raid loaded')

//+raids [raid name],<yyyy-mm-dd>,<value>
exports.run = async (req, matches) => {
    //parse args
    let args = req.args.split(',')
    let description = args.shift().trim()
    if (!validate.channel(description)) return warning_view.send(req, "invalid raid. please use #raid-name")
    if (args.length > 0) {
        var date = args.shift().trim()
        date = moment(date, 'YYYY-MM-DD')
        if (!date.isValid()) return warning_view.send(req, "invalid date format. please use YYYY-MM-DD")
    }
    if (args.length > 0) {
        var value = args.shift().trim()
    }
    logger.debug(description)
    logger.debug(date || moment())
    logger.debug(value || 1)

    let seq = await Sequence.findOneAndUpdate({ _id: 'raids' }, { $inc: { n: 1 } })
    let r = new Raid({
        _id: seq.n,
        date: Date.parse(date) || Date.now(),
        description: description,
        enteredby: `<@${req.message.author.id}>`,
        users: [],
        loots: [],
        value: value || 1
    })

    await r.save(function (err) {
        if (err) return error_view.send(req, err)
    })
    raid_view.send(req, r)
}

exports.roles = process.env.EDITOR_ROLES

exports.help = async (req, matches) => {

}

exports.test = async (req, matches) => {

}