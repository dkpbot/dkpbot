require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils.js')
//views
const attendance_view = require('../views/attendance.js')
const raid_view = require('../views/raid.js')
const help_view = require('../views/help.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

logger.ok('controllers/attendance/command loaded')

//var active = false
const thumbsup = "👍"

exports.run = async(req, matches) => {
    if(!req.args) return warning_view.send(req, "invalid parameters")
    //if(active) return warning_view.send(req, 'only one rollcall may be active at a time')
    //active = true
    //message.delete(0)

    let msg = await attendance_view.send(req, req.args)
    await msg.react(thumbsup)
    const reactions = await msg.awaitReactions(
        reaction => reaction.emoji.name === thumbsup, {time: 30000})
    let thumbreactions = await reactions.get(thumbsup)
    let users = thumbreactions.users.array().filter(x => x != process.env.BOT)
    await msg.delete()
    
    let seq = await Sequence.findOneAndUpdate({_id:'raids'}, {$inc: {n:1}})

    let r = new Raid ({
        _id: seq.n,
        date:Date.now(),
        description: req.args,
        enteredby: `<@${req.message.author.id}>`,
        users: users,
        loots: [],
        value: 1
    })

    //active = false
    await r.save( function(err) {
        if (err) return error_view.send(req, err)
    })
    raid_view.send(req, r)
}
exports.roles = process.env.EDITOR_ROLES

exports.help = function(req){
    let msg = `creates a new raid and adds all users that react with a ${thumbsup} after a short time.\n\n` +
        `usage: !attendance [raid name]\n`
        
    help_view.send(req, msg)
}

exports.test = async()=> {
    logger.debug('command.test')
}