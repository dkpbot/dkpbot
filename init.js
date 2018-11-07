/*
    initialization code to run once on install
*/
require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
const fs = require('fs')
const log = require('./utils/log.js')


let contents = fs.readFileSync('./init/events.json')
let parsed = JSON.parse(contents)
parsed.forEach(x => {
    log.debug(x.event)
})

/*discord
    * read items and events from init json files
    * create #event channel for each event
    * create @item role for each item
*/

//not sure if you have to explicitly create a collection, or if just inserting into it creates it?

/*mongodb setup
    * db.sequences.insert({_id:'raids',n:1})
    * db.raids.insert({_id:'loots',n:1})
    * for each #event insert {<#role>, event} into colelction
    * for each @item insert {<@&roleid>, item} into collection
*/