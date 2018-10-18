require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('../utils/logger.js')
const fs = require('fs')
//models
const Event = mongoose.model('Event')
const Item = mongoose.model('Item')
const Sequence = mongoose.model('Sequence')

//bot user must have 'magage roles' and 'manage channels' permissions on discord
exports.run = async (req, matches) => {
    //events
    let contents = fs.readFileSync('./init/events.json')
    let parsed = JSON.parse(contents)
    let category = await req.message.guild.createChannel('events', 'category', [], 'dkpbot')
    let e = new Event({
        _id: `<#${category.id}>`,
        name: 'events',
        img: ''
    })
    await e.save(function (err) {
        if (err) return logger.debug(err)
    })

    parsed.forEach(async x => {
        let channel = await req.message.guild.createChannel(x.event, 'text')
        channel.setParent(category.id)
        let e = new Event({
            _id: `<#${channel.id}>`,
            name: x.event,
            img: ''
        })
        await e.save(function (err) {
            if (err) return logger.debug(err)
        })
    })

    //items
    contents = fs.readFileSync('./init/items.json')
    parsed = JSON.parse(contents)
    parsed.forEach(async x => {
        let role = await req.message.guild.createRole({
            name: x.item,
            color: '0xFF00FF',
            mentionable: true,
            permissions: []
        })
        logger.ok(`creating role: "${x.item}" <@&${role.id}>`)
        let i = new Item({
            _id: `<@&${role.id}>`,
            name: x.item,
            value: 1,
            img: ''
        })
        await i.save(function (err) {
            if (err) return logger.debug(err)
        })

    })
    //set sequence counters
    let raidSeq = new Sequence({
        _id: 'raids',
        n: 1
    })
    raidSeq.save()
    let lootSeq = new Sequence({
        _id: 'loots',
        n: 1
    })
    lootSeq.save()

    logger.debug('init complete')
}