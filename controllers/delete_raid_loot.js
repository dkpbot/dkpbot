require('dotenv').config()
const mongoose = require('mongoose')
const log = require('../utils/log.js')
const cast = require('../utils/cast.js')
//views
const ok_view = require('../views/ok.js')
const help_view = require('../views/help.js')
const warning_view = require('../views/warning.js')
const error_view = require('../views/error.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

//-raids/n/loots n
exports.run = async (req, matches) => {
    //parse args
    if (req.args === '') return warning_view.render(req, "invalid parameters")
    let lootId = req.args.trim()
    let raidId = matches[1]
    log.debug(`lootId: ${lootId}`)
    log.debug(`raidId: ${raidId}`)
    //fetch raid
    let r = await Raid.findOne({ _id: raidId }, function (err) {
        if (err) return error_view.render(req, err)
    })
    if (!r) return warning_view.render(req, "invalid raid")

    //remove loot
    let found = false
    for (let i = 0; i < r.loots.length; i++) {
        if (r.loots[i]._id == lootId) {
            r.loots.splice(i, 1)
            found = true
        }
    }
    if (!found) return warning_view.render(req, "invalid loot")

    //save to db
    await r.save(function (err) {
        if (err) return error_view.render(req, err)
        return ok_view.render(req,
            `removed loot ${lootId} ` +
            `from raid ${r._id} ${cast.channel(r.event)}`)
    })
}

exports.test = async (req, matches) => {

}