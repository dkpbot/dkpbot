require('dotenv').config()
const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const validate = require('../utils/validate.js')
//views
const ok_view = require('../views/ok.js')
const help_view = require('../views/help.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

logger.ok('controllers/add_raid_loot loaded')

//+raids/n/loots @user,@loot,<main|alt>
//not sure on best way to handle alt. true/t || false/f, or alt vs blank?
exports.run = async (req, matches) => {
    //parse args
    let args = req.args.split(',')
    if (args.length < 2) return warning_view.send(req, "invalid parameters")
    let user = args.shift().trim()
    if (!validate.user(user)) return warning_view.send(req, "invalid user")
    if (user === process.env.BOT) return warning_view.send(req, "invalid user")
    let item = args.shift().trim()
    if (!validate.role(item)) return warning_view.send(req, "invalid item")
    let alt = false
    if (args.length > 0) {
        alt = args.shift().trim()
        alt == 'alt' ? alt = true : alt = false
    }
    let raid_id = matches[1]

    //fetch raid
    let r = await Raid.findOne({ _id: raid_id }, function (err) {
        if (err) return error_view.send(req, err)
    })
    if (!r) return warning_view.send(req, "invalid raid")

    //write to db
    seq = await Sequence.findOneAndUpdate({ _id: 'loots' }, { $inc: { n: 1 } })
    r.loots.push({ _id: seq.n, user: user, item: item, alt: alt })
    await r.save(function (err) {
        if (err) return error_view.send(req, err)
        ok_view.send(req,
            `raid ${r._id} updated:\n` +
            `${user} looted a shiny '${item}'`)
    })
}

exports.roles = process.env.EDITOR_ROLES

exports.help = async (req, matches) => {
    text = "+raids/n/loots @user, @item, <main | alt>\n" +
        "@user looted @item at raid n\n" +
        "<main | alt> is optional as 'main' is assumed"
    help_view.send(req, text)
}

exports.test = async (req, matches) => {

}