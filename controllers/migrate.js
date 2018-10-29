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

    //raids
    raids = []
    let raidFile = fs.readFileSync('./migrate/raids.json')
    let raidsParsed = JSON.parse(raidFile)
    logger.debug(`adding ${raidsParsed.length} raids`)
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
    })

    //raid_users
    let userFile = fs.readFileSync('./migrate/raid_users.json')
    let raid_users = JSON.parse(userFile)
    logger.debug(`adding ${raid_users.length} raid_users`)
    console.time('raid_users')
    let index = 0
    raid_users.forEach(ru => {
        if (ru.raid_id != raids[index]._id) {
            for (i = index; i < raids.length; i++) {
                if (raids[i]._id == ru.raid_id) {
                    index = i
                    break
                }
            }
        }
        raids[index].users.push(ru.user)
    })

    /*raids.forEach(raid => {
        raid_users.forEach(raid_user => {
            if (raid._id == raid_user.raid_id) {
                raid.users.push(raid_user.user)
            }
        })
    })*/
    console.timeEnd('raid_users')

    //raid_loots
    let lootFile = fs.readFileSync('./migrate/raid_loots.json')
    let loots = JSON.parse(lootFile)
    logger.debug(`adding ${loots.length} loots`)
    index = 0
    loots.forEach(loot => {
        if (loot.raid_id != raids[index]._id) {
            for (i = index; i < raids.length; i++) {
                if (raids[i]._id == loot.raid_id) {
                    index = i
                    break
                }
            }
        }
        let alt = loot.itempool == 'DKP' ? false : true
        let item = items.find(i => i.name.toLowerCase() == loot.item.toLowerCase().trim())
        if (item) {
            var loot = { _id: loot.id, user: loot.user, item: item.id, alt: alt }
        } else {
            var loot = { _id: loot.id, user: loot.user, item: loot.item, alt: alt }
        }
        raids[index].loots.push(loot)
    })
    /*raids.forEach(raid => {
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

    })*/

    //save to db
    logger.debug(`saving to database`)
    await Raid.insertMany(raids, function (err) {
        if (err) return logger.error(err)
    })

    //set sequence counters
    await Sequence.updateOne({ _id: 'raids' }, { n: parseInt(raids[raids.length - 1].id) + 1 }, function (err) {
        if (err) logger.error(err)
    })
    await Sequence.updateOne({ _id: 'loots' }, { n: loots[loots.length - 1].id + 1 }, function (err) {
        if (err) logger.error(err)
    })
    logger.debug('migration finished')
}