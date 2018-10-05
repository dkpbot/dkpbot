require('dotenv').config()
const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const validate = require('../utils/validate.js')
//views
const ok_view = require('../views/ok.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

logger.ok('controllers/add_raid_loot loaded')

exports.run = async (req, matches) => {
    //parse args
    let args = req.args.split(' ')
    if (args.length < 2) return warning_view.send(req, "invalid parameters")
    let user = args.shift()

    let item = args.join(' ').replace(/\"|\'/g, '')
    /*if(user) {
        user = user.trim()
    }*/
    //let alt = args.shift() || false
    let alt = false

    //validate args
    let raid_id = matches[1]
    if (!validate.user(user)) return warning_view.send(req, "invalid user")
    if (user === process.env.BOT) return warning_view.send(req, "invalid user")
    //fetch raid
    let r = await Raid.findOne({ _id: raid_id }, function (err) {
        if (err) return error_view.send(req, err)
    })
    if (!r) return warning_view.send(req, "invalid raid")

    //add loot
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

}

exports.test = async (req, matches) => {

}