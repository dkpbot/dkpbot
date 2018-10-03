const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
const utils = require('../utils/utils.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

logger.ok('controllers/raids/read_one loaded')

exports.run = async (req, matches) => {
    let seq = await Sequence.findOneAndUpdate({_id:'raids'}, {$inc: {n:1}})
    let r = new Raid ({
        _id: seq.n,
        date:Date.now(),
        description: req.args,
        enteredby: `<@${req.message.author.id}>`,
        users: users.map(x => x.id),
        loots: [],
        value: 1
    })

    active = false
    await r.save( function(err) {
        if (err) return error_view.send(req, err)
    })
    raid_view.send(req, r)
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}