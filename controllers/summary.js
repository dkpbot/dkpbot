const mongoose = require('mongoose')
const moment = require('moment')
const logger = require('../utils/logger.js')
const validate = require('../utils/validate.js')
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
        user = `<@${req.message.author.id}>`
    }
    if (!validate.user(user)) return warning_view.render(req, "invalid user")
    if (user === process.env.BOT) return warning_view.render(req, "invalid user")

    let conditions = {
        //users: user,
        date: { '$gte': moment().subtract(90, 'days') }
    }
    raids = await Raid.find(conditions, function (err) {
        if (err) return error_view.render(req, err)
    })

    maxdkp = raids
        .map(x => x.value)
        .reduce((acc, val) => acc + val, 0)

    dkp = raids
        .map(x => {
            if (x.users.includes(user)) {
                return x.value
            }
            else return 0
        })
        .reduce((acc, val) => acc + val, 0)

    loots = []
    raids.forEach(raid => {
        raid.loots.forEach(loot => {
            if (loot.user == user) {
                loot.date = raid.date
                loots.push(loot)
            }
        })
    })

    summary_view.render(req, user, maxdkp, dkp, loots)

}

exports.help = function (req) {

}

exports.test = async (req, matches) => {

}