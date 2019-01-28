const mongoose = require('mongoose')
const log = require('../utils/log.js')
const moment = require("moment")
const validate = require('../utils/validate.js')
const parse = require('../utils/parse.js')
//views
const raid_view = require('../views/raid.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

//+raids [raid name],<yyyy-mm-dd>,<value>
exports.run = async (req, matches) => {
    //parse args
    let args = req.args.split(',')
    let event = args.shift().trim()
    if (!validate.channel(event)) return warning_view.render(req, "invalid raid. please use #raid-name")
    event = parse.channel(event)
    if (args.length > 0) {
        var value = args.shift().trim()
    }
    if (args.length > 0) {
        var date = args.shift().trim()
        if (!validate.date(date)) return warning_view.render(req, "invalid date format. please use YYYY-MM-DD")
        date = moment(date, 'YYYY-MM-DD')
    }


    let seq = await Sequence.findOneAndUpdate({ _id: 'raids' }, { $inc: { n: 1 } })
    let r = new Raid({
        _id: seq.n,
        date: Date.parse(date) || Date.now(),
        event: event,
        enteredby: `${req.message.author.id}`,
        users: [],
        loots: [],
        value: value || 1
    })

    await r.save(function (err) {
        if (err) return error_view.render(req, err)
    })
    raid_view.render(req, r)
}

exports.test = async (req, matches) => {

}