const mongoose = require('mongoose')
const log = require('../../utils/log.js')
const validate = require('../../utils/validate.js')
const parse = require('../../utils/parse.js')
const cast = require('../../utils/cast.js')
//views
const ok_view = require('../../views/ok.js')
const warning_view = require('../../views/warning.js')
const error_view = require('../../views/error.js')
//models
const Raid = mongoose.model('Raid')

exports.run = async (req, matches) => {
    //validate args
    let args = req.args.split(',')
    let user = args.shift().trim()
    if (!validate.user(user)) return warning_view.render(req, "invalid user")
    if (user === process.env.BOT) return warning_view.render(req, "invalid user")
    user = parse.user(user)
    let eqdkpUser = args.shift()
    if (!eqdkpUser) return warning_view.render(req, "invalid eqdkp user")
    eqdkpUser = eqdkpUser.trim()

    log.debug(`user: ${user}`)
    log.debug(`eqdkpUser: ${eqdkpUser}`)
    raids = await Raid.find({}, function (err) {
        if (err) return error_view.render(req, err)
    })

    raids.forEach(async raid => {
        let changed = false
        if (raid.users.includes(eqdkpUser)) {
            raid.users.splice(raid.users.indexOf(eqdkpUser), 1)
            raid.users.push(user)
            changed = true
        }
        raid.loots.forEach(loot => {
            if (loot.user == eqdkpUser) {
                loot.user = user
                changed = true
            }
        })
        if (raid.enteredby == eqdkpUser) {
            raid.enteredby = user
            changed = true

        }

        if (changed) {
            await raid.save((err) => {
                if (err) log.err(err)
            })
            log.debug(`changing raid ${raid.id}`)
        }
    })
    ok_view.render(req, `all instances of ${eqdkpUser} replaced with ${cast.user(user)}`)

}

exports.test = async (req, matches) => {

}