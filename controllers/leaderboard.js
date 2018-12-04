const mongoose = require('mongoose')
const moment = require('moment')
const log = require('../utils/log.js')
const validate = require('../utils/validate.js')
const cast = require('../utils/cast.js')
const parse = require('../utils/parse.js')
//views
const leaderboard_view = require('../views/leaderboard.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

exports.run = async (req, matches) => {

    let conditions = {
        date: { '$gte': moment().subtract(90, 'days') }
    }
    let raids = await Raid.find(conditions, function (err) {
        if (err) return error_view.render(req, err)
    }).sort({ date: -1 })


    let maxdkp = raids
        .map(x => x.value)
        .reduce((acc, val) => acc + val, 0)

    tallies = []
    raids.forEach(raid => {
        raid.users.forEach(user => {
            let tally = tallies.find(x => x.name == user)
            if (tally) {
                tally.value += raid.value
            } else {
                tallies.push({ name: user, value: raid.value })
            }
        })
    })
    return leaderboard_view.render(req, maxdkp, tallies)
}

exports.test = async (req, matches) => {

}