require('dotenv').config()
const mongoose = require('mongoose')
const log = require('../utils/log.js')
const validate = require('../utils/validate.js')
const parse = require('../utils/parse.js')
const cast = require('../utils/cast.js')
//views
const ok_view = require('../views/ok.js')
const help_view = require('../views/help.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

exports.run = async (req, matches) => {
    //validate args
    let raid_id = matches[1]
    let user = req.args
    if (!validate.user(user)) return warning_view.render(req, "invalid user")
    if (user === process.env.BOT) return warning_view.render(req, "invalid user")
    user = parse.user(user)

    //fetch raid
    let r = await Raid.findOne({ _id: raid_id }, function (err) {
        if (err) return error_view.render(req, err)
    })
    if (!r) return warning_view.render(req, "invalid raid")

    //add user
    if (!r.users.includes(user)) {
        r.users.push(user)
        await r.save(function (err) {
            if (err) return error_view.render(req, err)
            return ok_view.render(req,
                `added ${cast.user(user)} ` +
                `to raid ${r._id} ${cast.channel(r.event)}`)
        })
    } else {
        return warning_view.render(req, 'user is already attending this raid')
    }
}

exports.help = function (req) {
    let msg = `adds @user to raid n.\n\n` +
        `usage: +raids/n/users [@user]\n`
    help_view.render(req, msg)
}

exports.test = async (req, matches) => {

}