require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
const fs = require('fs')
const moment = require('moment')
//models
const Event = mongoose.model('Event')
const Item = mongoose.model('Item')
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

//bot user must have 'magage roles' and 'manage channels' permissions on discord
exports.run = async (req, matches) => {
    events = await Event.find({}, function (err) {
        if (err) logger.error(err)
    })
    items = await Item.find({}, function (err) {
        if (err) logger.error(err)
    })

    raids = []
    //raids
    let raidFile = fs.readFileSync('./migrate/raids.json')
    let raidsParsed = JSON.parse(raidFile)
    raidsParsed.forEach(raid => {
        let event = events.find(event => event.name == raid.event)
        let r = new Raid({
            _id: raid.id,
            date: moment(raid.date),
            event: event.id,
            enteredby: raid.addedby,
            users: [],
            loots: [],
            value: raid.value || 1
        })
        raids.push(r)
        logger.debug(`adding raid ${r.id}`)
    })

    //raid_users
    let userFile = fs.readFileSync('./migrate/raid_users.json')
    let usersParsed = JSON.parse(userFile)
    users = [...new Set(usersParsed)]
    raids.forEach(raid => {
        users.forEach(user => {
            if (raid._id == user.raid_id) {
                raid.users.push(user.user)
            }
        })
        logger.debug(`adding users to raid ${raid.id}`)
    })

    //raid_loots
    let lootFile = fs.readFileSync('./migrate/raid_loots.json')
    let loots = JSON.parse(lootFile)
    raids.forEach(raid => {
        loots.forEach(loot => {
            if (raid._id == loot.raid_id) {
                let alt = loot.itempool == 'DKP' ? false : true
                let item = items.find(i => i.name.toLowerCase() == loot.item.toLowerCase().trim())
                if (item) {
                    var loot = { _id: loot.id, user: loot.user, item: item.id, alt: alt }
                } else {
                    var loot = { _id: loot.id, user: loot.user, item: loot.item, alt: alt }
                }
                raid.loots.push(loot)
            }
        })
        logger.debug(`adding loots to raid ${raid.id}`)
    })
    //save to db
    Raid.insertMany(raids, function (err) {
        if (err) return logger.error(err)
    })
    //set sequence counters
    Sequence.updateOne({ _id: 'raids' }, { n: raids[raids.length - 1].id + 1 })
    Sequence.updateOne({ _id: 'loots' }, { n: raids[loots.length - 1].id + 1 })
    logger.debug('migration finished')
}