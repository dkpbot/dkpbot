require('dotenv').config()
const mongoose = require('mongoose')
const log = require('../../utils/log.js')
//models
const Event = mongoose.model('Event')
const Item = mongoose.model('Item')

//bot user must have 'magage roles' and 'manage channels' permissions on discord
exports.run = async (req, matches) => {
    //remove events
    events = await Event.find({}, function (err) {
        if (err) return error_view.render(req, err)
    }).sort({ createdTimestamp: - 1 })
    events.forEach(async event => {
        event = await req.message.guild.channels.get(event._id)
        //log.debug(event)
        await event.delete()
        Event.deleteOne({ _id: event._id }, function (err) {
            if (err) log.error(err)
        })
        log.debug(`deleting event ${event.name}`)
    })
    //remove items
    roles = req.message.guild.roles.findAll('color', 0xFF00FF)
    await roles.forEach(async x => {
        await Item.deleteOne({ _id: x.id }, function (err) {
            if (err) log.error(err)
        })
        await x.delete()

    })
    log.debug('un_init complete')
}