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
    let conditions = {}
    if (req.args) {
        let args = req.args.trim()
        if (validate.user(args)) {
            conditions = {
                "users": { "$ne": parse.user(args) },
                date: { '$gte': moment().subtract(90, 'days') }
            }
        }
        else {
            warning_view.render(req, "invalid arguments.\ntry @user")
            return
        }
        //user = req.message.author.id
    }
    else {
        conditions = {
            "users": { "$ne": parse.user(req.message.author.id) },
            date: { '$gte': moment().subtract(90, 'days') }
        }

    }
    console.log(req.message.author.id)
    console.log(conditions)
    //fetch data
    raids = await Raid.find(conditions, function (err) {
        if (err) return error_view.render(req, err)
    }).sort({ date: -1 }).limit(50)
    raids_view.render(req, raids)
}

exports.test = async (req, matches) => {

}