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
    //items.forEach(x => logger.debug(x))

    raids = []
    //raids
    let raidFile = fs.readFileSync('./migrate/raids.json')
    let raidsParsed = JSON.parse(raidFile)
    raidsParsed.forEach(x => {
        //logger.debug(`id: ${x.id}, addedby: ${x.addedby}, date: ${x.date}, event: ${x.event}, value: ${x.value}`)
        let event = events.find(e => e.name == x.event)
        let raid = new Raid({
            _id: x.id,
            date: moment(x.date),
            event: event.id,
            enteredby: x.addedby,
            users: [],
            loots: [],
            value: x.value || 1
        })
        raids.push(raid)
        logger.debug(`adding raid ${raid.id}`)
    })
    //logger.debug(raids)

    //raid_users
    let userFile = fs.readFileSync('./migrate/raid_users.json')
    let users = JSON.parse(userFile)
    raids.forEach(raid => {
        users.forEach(ru => {
            if (raid._id == ru.raid_id) {
                raid.users.push(ru.user)
            }
        })
        logger.debug(`adding users to raid ${raid.id}`)
    })

    //raid_loots
    let lootFile = fs.readFileSync('./migrate/raid_loots.json')
    let loots = JSON.parse(lootFile)
    raids.forEach(raid => {
        loots.forEach(rl => {
            if (raid._id == rl.raid_id) {
                let alt = rl.itempool == 'DKP' ? false : true
                let item = items.find(i => i.name.toLowerCase() == rl.item.toLowerCase().trim())
                if (item) {
                    var loot = { _id: rl.id, user: rl.user, item: item.id, alt: alt }
                } else {
                    var loot = { _id: rl.id, user: rl.user, item: rl.item, alt: alt }
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

exports.roles = process.env.EDITOR_ROLES