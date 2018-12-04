const mongoose = require('mongoose')
const log = require('../utils/log.js')
const validate = require('../utils/validate.js')
const parse = require('../utils/parse.js')
//views
const raids_view = require('../views/raids.js')
const help_view = require('../views/help.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')

exports.run = async (req, matches) => {
    //validate args
    let conditions = {}
    if (req.args) {
        let args = req.args.trim()
        if (validate.user(args)) {
            conditions = { "users": parse.user(args) }
        }
        if (validate.channel(args)) {
            conditions = { "event": parse.channel(args) }
        }
        if (validate.role(args)) {
            conditions = { "loots.item": parse.role(args) }
        }
        user = req.message.author.id
    }
    //fetch data
    raids = await Raid.find(conditions, function (err) {
        if (err) return error_view.render(req, err)
    }).sort({ date: -1 }).limit(50)
    raids_view.render(req, raids)
}

exports.test = async (req, matches) => {

}