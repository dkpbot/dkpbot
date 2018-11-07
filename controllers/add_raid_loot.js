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
const Sequence = mongoose.model('Sequence')

//+raids/n/loots @user,@loot,<main|alt>
exports.run = async (req, matches) => {
    //parse args
    let args = req.args.split(',')
    if (args.length < 2) return warning_view.render(req, "invalid parameters")
    let user = args.shift().trim()
    if (!validate.user(user)) return warning_view.render(req, "invalid user")
    if (user === process.env.BOT) return warning_view.render(req, "invalid user")
    user = parse.user(user)
    let item = args.shift().trim()
    if (!validate.role(item)) return warning_view.render(req, "invalid item")
    item = parse.role(item)
    let alt = false
    if (args.length > 0) {
        alt = args.shift().trim()
        alt == 'alt' ? alt = true : alt = false
    }
    let raid_id = matches[1]

    //fetch raid
    let r = await Raid.findOne({ _id: raid_id }, function (err) {
        if (err) return error_view.render(req, err)
    })
    if (!r) return warning_view.render(req, "invalid raid")

    //write to db
    seq = await Sequence.findOneAndUpdate({ _id: 'loots' }, { $inc: { n: 1 } })
    r.loots.push({ _id: seq.n, user: user, item: item, alt: alt })
    await r.save(function (err) {
        if (err) return error_view.render(req, err)

    })
    ok_view.render(req,
        `raid ${r._id} updated:\n` +
        `${cast.user(user)} looted a shiny ${alt == true ? cast.role(item) + '(alt)' : cast.role(item)}`)
}

exports.help = async (req, matches) => {
    text = "+raids/n/loots @user, @item, <main | alt>\n" +
        "@user looted @item at raid n\n" +
        "<main | alt> is optional as 'main' is assumed"
    help_view.render(req, text)
}

exports.test = async (req, matches) => {

}