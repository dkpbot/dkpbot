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
    let args = req.args.split(',')
    let users = []
    let discards = []

    //fetch raid
    let r = await Raid.findOne({ _id: raid_id }, function (err) {
        if (err) return error_view.render(req, err)
    })
    if (!r) return warning_view.render(req, "invalid raid")

    //seperate valid and invalid arguments
    args.forEach(x => {
        let user = x.trim()
        if (!validate.user(user)) discards.push(user)
        else {
            user = parse.user(user)
            if (r.users.includes(user)) {
                discards.push(cast.user(user))
            } else {
                users.push(user)
            }
        }
    })

    if (users.length > 0) {
        //save to db
        r.users.push(...users)
        await r.save(function (err) {
            if (err) return error_view.render(req, err)
        })
        //show results
        prettyUsers = users.map(x => { return cast.user(x) })
        ok_view.render(req,
            `added ${prettyUsers} ` +
            `to raid ${r._id} ${cast.channel(r.event)} `)
    }
    if (discards.length > 0) {
        warning_view.render(req,
            `unable to add ${discards} `)
    }
}

exports.test = async (req, matches) => {

}