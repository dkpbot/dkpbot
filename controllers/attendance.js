require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
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
    if (!req.args) return warning_view.render(req, "invalid parameters")
    let args = req.args.split(',')
    let event = args.shift().trim()
    if (args.length > 0) {
        var value = Number.parseInt(args[0].trim())
    }
    let msg = await attendance_view.render(req, event)
    await msg.react(thumbsup)
    const reactions = await msg.awaitReactions(
        reaction => reaction.emoji.name === thumbsup, { time: 30000 })
    let thumbreactions = await reactions.get(thumbsup)
    let users = thumbreactions.users.array().filter(x => x != process.env.BOT)
    await msg.delete()

    let seq = await Sequence.findOneAndUpdate({ _id: 'raids' }, { $inc: { n: 1 } })

    let r = new Raid({
        _id: seq.n,
        date: Date.now(),
        event: event,
        enteredby: `<@${req.message.author.id}>`,
        users: users,
        loots: [],
        value: value || 1
    })
    await r.save(function (err) {
        if (err) return error_view.render(req, err)
    })
    raid_view.render(req, r)
}

exports.help = function (req) {
    let msg = `creates a new raid and adds all users that react with a ${thumbsup} after a short time.\n\n` +
        `usage: !attendance [raid name]\n`

    help_view.render(req, msg)
}

exports.test = async () => {
    logger.debug('command.test')
}