const mongoose = require('mongoose')
const moment = require('moment')
const log = require('../utils/log.js')
const validate = require('../utils/validate.js')
const parse = require('../utils/parse.js')
//views
const raids_view = require('../views/raids.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

exports.run = async (req, matches) => {
    //validate args
    console.log(req.args)
    let conditions = { date: { '$gte': moment().subtract(90, 'days') } }
    if (req.args) {
        let args = req.args.trim()
        if (validate.user(args)) {
            conditions = {
                "users": parse.user(args),
                date: { '$gte': moment().subtract(90, 'days') }
            }
        }
        else if (validate.channel(args)) {
            conditions = {
                "event": parse.channel(args),
                date: { '$gte': moment().subtract(90, 'days') }
            }
        }
        else if (validate.role(args)) {
            conditions = {
                "loots.item": parse.role(args),
                date: { '$gte': moment().subtract(90, 'days') }
            }
        }
        else if (validate.date(args)) {
            let start = moment(args)
            let end = start.clone().add(1, 'day')
            conditions = { "date": { '$gte': start, '$lt': end } }
            log.debug(JSON.stringify(conditions))
        }
        else {
            warning_view.render(req, "invalid arguments.\ntry @user, @loot, #event or yyyy-mm-dd")
            return
        }
        //user = req.message.author.id
    }
    //fetch data
    raids = await Raid.find(conditions, function (err) {
        if (err) return error_view.render(req, err)
    }).sort({ date: -1 }).limit(50)
    raids_view.render(req, raids)
}

exports.test = async (req, matches) => {

}