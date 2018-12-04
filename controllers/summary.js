const mongoose = require('mongoose')
const moment = require('moment')
const log = require('../utils/log.js')
const validate = require('../utils/validate.js')
const cast = require('../utils/cast.js')
const parse = require('../utils/parse.js')
//views
const summary_view = require('../views/summary.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

exports.run = async (req, matches) => {
    //validate args
    let user = req.args
    if (!user) {
        user = req.message.author.id
    } else {
        if (!validate.user(user)) return warning_view.render(req, "invalid user")
        if (user === process.env.BOT) return warning_view.render(req, "invalid user")
        user = parse.user(user)
    }
    let conditions = {
        date: { '$gte': moment().subtract(90, 'days') }
    }
    let raids = await Raid.find(conditions, function (err) {
        if (err) return error_view.render(req, err)
    }).sort({ date: -1 })

    let maxdkp = raids
        .map(x => x.value)
        .reduce((acc, val) => acc + val, 0)

    let dkp = raids
        .map(x => {
            if (x.users.includes(user)) {
                return x.value
            }
            else return 0
        })
        .reduce((acc, val) => acc + val, 0)

    let loots = []
    raids.forEach(raid => {
        raid.loots.forEach(loot => {
            if (loot.user == user) {
                loot.date = raid.date
                loot.raidid = raid._id
                loots.push(loot)
            }
        })
    })

    summary_view.render(req, user, maxdkp, dkp, loots)

}

exports.test = async (req, matches) => {

}