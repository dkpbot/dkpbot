const mongoose = require('mongoose')
const log = require('../utils/log.js')
const validate = require('../utils/validate.js')
const parse = require('../utils/parse.js')
const cast = require('../utils/cast.js')
//views
const ok_view = require('../views/ok.js')
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
    log.debug(user)

    //fetch raid
    let r = await Raid.findOne({ _id: raid_id }, function (err) {
        if (err) return error_view.render(req, err)
    })
    if (!r) return warning_view.render(req, "invalid raid")

    //remove user
    let index = r.users.indexOf(user)
    if (index === -1) return warning_view.render(req, "user did not attend this raid")

    r.users.splice(index, 1)
    await r.save(function (err) {
        if (err) return error_view.render(req, err)
        return ok_view.render(req,
            `removed ${cast.user(user)}` +
            `from raid ${r._id} '${cast.channel(r.event)}'`)
    })
}

exports.help = async (req, matches) => {

}

exports.test = async (req, matches) => {

}