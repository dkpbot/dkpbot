require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
const fs = require('fs')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')
const router = require('./router.js')

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.URI, { useNewUrlParser: true }, function (err) {
    if (err) logger.error(err)
    logger.ok(`connected to ${mongoose.connection.name} at: ${mongoose.connection.host}`)
})

//register mongo schemas
let models = fs.readdirSync('./models/')
models.forEach(model => {
    require(`./models/${model}`)
})

//register routes
router.add(/\!help$/, './controllers/help', 'all')
router.add(/\!summary$/, './controllers/summary', 'user')
router.add(/\?raids$/, './controllers/list_raids', 'user')
router.add(/\?raids\/(\d+)$/, './controllers/read_raid', 'user')
router.add(/\!attendance$/, './controllers/attendance', 'editor')
router.add(/\+raids$/, './controllers/add_raid', 'editor')
router.add(/\+raids\/(\d*)\/loots$/, './controllers/add_raid_loot', 'editor')
router.add(/\+raids\/(\d*)\/users$/, './controllers/add_raid_user', 'editor')
router.add(/-raids\/(\d*)\/loots$/, './controllers/remove_raid_loot', 'editor')
router.add(/-raids\/(\d*)\/users$/, './controllers/remove_raid_user', 'editor')
router.add(/\+item$/, './controllers/add_item', 'owner')
router.add(/\!uninit$/, './controllers/un_init', 'owner')
router.add(/\!init$/, './controllers/init', 'owner')
router.add(/\!migrate$/, './controllers/migrate', 'owner')
router.add(/\!register$/, './controllers/register.js', 'owner')

//register discord event handlers
fs.readdir('./events/', (err, files) => {
    if (err) return logger.error(err)
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`)
        let eventName = file.split('.')[0]
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args))
    })
})

bot.login(process.env.TOKEN)