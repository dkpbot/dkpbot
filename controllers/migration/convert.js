const mongoose = require('mongoose')
const log = require('../../utils/log.js')
const validate = require('../../utils/validate.js')
const parse = require('../../utils/parse.js')
const cast = require('../../utils/cast.js')
//models
const Event = mongoose.model('Event')
const Item = mongoose.model('Item')
const Raid = mongoose.model('Raid')

//converts all id's from <@12345> etc syntax to 12345
exports.run = async (req, matches) => {
    //raids
    let raids = await Raid.find({}, function (err) {
        if (err) return log.error(err)
    })
    raids.forEach(raid => {
        //event 
        raid.event = parse.channel(raid.event)
        //enteredBy
        raid.enteredby = parse.user(raid.enteredby)
        //users
        raid.users = raid.users.map(user => {
            return parse.user(user)
        })
        //loots
        raid.loots = raid.loots.map(loot => {
            loot.user = parse.user(loot.user)
            loot.item = parse.role(loot.item)
            return loot
        })
        raid.save(function (err) {
            if (err) return log.error(err)
        })
    })
    log.debug(`raid count: ${raids.length}`)

    //events
    let events = await Event.find({}, function (err) {
        if (err) return log.error(err)
    })

    events.forEach(event => {
        if (validate.channel(event._id)) {
            log.debug(`updating ${event._id}`)
            newEvent = new Event({
                _id: parse.channel(event._id),
                name: event.name,
                img: ""
            })
            newEvent.save()
            event.remove()
        }
    })


    //items
    let items = await Item.find({}, function (err) {
        if (err) return log.error(err)
    })
    items.forEach(item => {
        if (validate.role(item._id)) {
            log.debug(`updating ${item._id} to ${parse.role(item._id)}`)
            newItem = new Item({
                _id: parse.role(item._id),
                name: item.name,
                value: item.value,
                img: ""
            })
            newItem.save()
            item.remove()
        }
    })



}