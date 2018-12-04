require('dotenv').config()
const mongoose = require('mongoose')
const log = require('../utils/log.js')
const cast = require('../utils/cast.js')
const parse = require('../utils/parse.js')
const validate = require('../utils/validate.js')
//views
const attendance_view = require('../views/attendance.js')
const raid_view = require('../views/raid.js')
const help_view = require('../views/help.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

const thumbsup = "👍"

exports.run = async (req, matches) => {
    if (!req.args) return warning_view.render(req, 'invalid parameters')
    let args = req.args.split(',')
    let event = args.shift().trim()
    if (!validate.channel(event)) return warning_view.render(req, 'invalid event')
    event = parse.channel(event)
    if (args.length > 0) {
        var value = Number.parseInt(args[0].trim())
    }
    let msg = await attendance_view.render(req, event)
    await msg.react(thumbsup)
    const reactions = await msg.awaitReactions(
        reaction => reaction.emoji.name === thumbsup, { time: 300000 })
    let thumbreactions = await reactions.get(thumbsup)
    let users = thumbreactions.users.array().filter(x => x != process.env.BOT)
    users = users.map(x => parse.user(x.id))
    await msg.delete()

    let seq = await Sequence.findOneAndUpdate({ _id: 'raids' }, { $inc: { n: 1 } })

    let r = new Raid({
        _id: seq.n,
        date: Date.now(),
        event: event,
        enteredby: `${req.message.author.id}`,
        users: users,
        loots: [],
        value: value == undefined ? 1 : value
    })
    await r.save(function (err) {
        if (err) return error_view.render(req, err)
    })
    raid_view.render(req, r)
}

exports.test = async () => {
    log.debug('command.test')
}