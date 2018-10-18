require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
//models
const Event = mongoose.model('Event')
const Item = mongoose.model('Item')

//bot user must have 'magage roles' and 'manage channels' permissions on discord
exports.run = async (req, matches) => {
    //remove events
    events = await Event.find({}, function (err) {
        if (err) return error_view.render(req, err)
    }).sort({ createdTimestamp: - 1 })
    events.forEach(async x => {
        id = x.id.match(/<#(\d*)>$/)[1]
        logger.debug(id)
        event = await req.message.guild.channels.get(id)
        //logger.debug(event)
        await event.delete()
        Event.deleteOne({ _id: x._id }, function (err) {
            if (err) logger.error(err)
        })
        logger.debug(`deleting event ${x.name}`)
    })
    //remove items
    roles = req.message.guild.roles.findAll('color', 0xFF00FF)
    await roles.forEach(async x => {
        await Item.deleteOne({ _id: `<@&${x.id}>` }, function (err) {
            if (err) logger.error(err)
        })
        await x.delete()

    })
    logger.debug('un_init complete')
}