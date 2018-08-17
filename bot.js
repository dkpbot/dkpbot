require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
const assert = require('assert')
const fs = require('fs')
//const mongo = require('./utils/mongo.js')
const logger = require ('./utils/logger.js')
const mongoose = require('mongoose')


// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.URI, { useNewUrlParser: true },function(err){
    if(err) logger.error(err)
    logger.ok(`connected to ${mongoose.connection.name} at: ${mongoose.connection.host}`)
})
//register mongo schemas
const user = require('./models/user')
const raid = require('./models/raid')
const sequence = require ('./models/sequence')

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
    if (err) return logger.error(err)
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`)
        let eventName = file.split(".")[0]
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args))
    })
})
bot.login(process.env.TOKEN)