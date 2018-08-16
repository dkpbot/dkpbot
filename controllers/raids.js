const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils')
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids loaded')

exports.read_all = async (bot, message, args) => {
    raids = await Raid.find({}, function(err) {
        if (err) return logger.error(err)
    }).sort({date:-1})
    let description = ''
    raids.forEach(x => {
        description += `${x._id} [${x.date.toLocaleDateString()}] '${x.description}'\n`
    })
    if(description.length >0){
        description.slice(0,-1)
    }
    const embed = new RichEmbed()
        .setTitle(`raids`)
        .setThumbnail('https://i.imgur.com/ephiFV7.png')
        .setColor(colors.cyan)
        .setDescription(description)
    let msg = await message.channel.send(embed)
}

exports.read_one = async (bot, message, raid_id, args) => {
    let r = await Raid.findOne({_id:raid_id}, function(err,doc) {
        if (err) return logger.error(err)
        if(!doc){
            logger.warn(`raid ${raid_id} not found`)
            return message.channel.send(`raid ${raid_id} not found`)
        }
        let nicknames = doc.users.map(x => utils.findNickname(bot, message, x)) 
        const embed = new RichEmbed()
        .setTitle(`raid: '${doc.description}' ${doc.date.toLocaleDateString()}`)
        .setColor(colors.cyan)
        .setDescription(`id: ${doc.id}\n` +
                        //`date: ${doc.date.toLocaleDateString()}\n` + //date is already in the title
                        `entered by: ${utils.findNickname(bot, message, doc.enteredby)}\n` +
                        `value: ${doc.value}\n` +
                        `users: [${nicknames}]\n` +
                        `loots: [${doc.loots}]`)
        message.channel.send(embed)
    })
}

exports.read_users = async (bot, message, raid_id, args) => {
    let r = await Raid.findOne({_id:raid_id}, function(err,doc) {
        if (err) return logger.error(err)

        //let nicknames = doc.users.map(x => utils.findNickname(x.id))
        let description = ''
        if(doc.users.length > 0){
            doc.users.forEach(id => {
                description += `${id} ${utils.findNickname(bot, message, id)}\n`
                description.slice(0,-1)
            })
        } else {
            description = 'no users found'
        }
        const embed = new RichEmbed()
            .setTitle(`users: '${doc.description}' ${doc.date.toLocaleDateString()}`)
            .setColor(colors.cyan)
            .setDescription(description)
        message.channel.send(embed)
    })
}

exports.add_user = async (bot, message, raid_id, args) => {
    //validate args
    var regex = /<@(\d*)>/
    var matches = args.match(regex)
    if(!matches){
        return message.channel.send(`invalid user\n` +
                                    `example: +raids/${raid_id}/users @user`)
    }else var user = matches[1]
    if(user === process.env.BOT){
        return message.channel.send(`BEEP BOOP. robots can't attend raids`)
    }
    //fetch raid
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return logger.error(err)
    })
    if(!r) {
        logger.warn(`raid ${raid_id} not found`)
        return message.channel.send(`raid ${raid_id} not found`)
    }
    //add user
    if(r.users.indexOf(user) === -1){
        r.users.push(user)

        await r.save( function(err, doc) {
            if (err) return logger.error(err)
            message.channel.send(`added ${utils.findNickname(bot,message,user)} to raid '${r.description}' ${r.date.toLocaleDateString()}`)
        })
    }else{
        return message.channel.send(`user is already attending this raid`)
    }
}