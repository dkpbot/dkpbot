const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../utils/logger.js')
const colors = require('../utils/colors.js')
const utils = require('../utils/utils.js')
//models
const Raid = mongoose.model('Raid')
const Sequence = mongoose.model('Sequence')

logger.ok('controllers/attendance loaded')

var active = false
const thumbsup = "👍"

exports.run = async(bot, message, command, args) => {
    if(active){
        message.channel.send(`only one rollcall may be active at a time.`)
        return
    }
    active = true
    //message.delete(0)
    
    const embedOpen = new RichEmbed()
        .setTitle(`taking attendance for '${args}'`)
        .setColor(colors.gold)
        .setDescription('THUMBS UP to get credit')
    let msg = await message.channel.send(embedOpen)
    await msg.react(thumbsup)
    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === thumbsup, {time: 5000})
    let thumbreactions = await reactions.get(thumbsup)
    let users = thumbreactions.users.array().filter(x => x.id != process.env.BOT)
    await msg.delete()
    seq = await Sequence.findOneAndUpdate({_id:'raids'}, {$inc: {n:1}})

    var r = new Raid ({
        _id: seq.n,
        date:Date.now(),
        description: args,
        enteredby: message.author.id,
        users: users.map(x => x.id),
        loots: [],
        value: 1
    })

    await r.save( function(err, doc) {
        if (err) return logger.error(err)

        const embedClose = new RichEmbed()
            .setTitle(`raid: '${args}' entered`)
            .setColor(colors.orange)
            .setDescription(`id: ${doc.id}\n` +
                        `entered by: ${utils.findNickname(bot, message, doc.enteredby)}\n` +
                        `value: ${doc.value}\n` +
                        //maybe replace username with findnickname
                        `users: [${doc.users.map(x => utils.findNickname(bot, message, x))}]\n` + 
                        `loots: [${doc.loots}]`)
        message.channel.send(embedClose)
    })
    active = false
  }