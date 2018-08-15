const mongoose = require('mongoose');
const { Client, RichEmbed } = require('discord.js');
const colors = require('../utils/colors.js');
//const config = require('../config.json');
//models
const Raid = mongoose.model('Raid');
const Sequence = mongoose.model('Sequence');

var active = false;
const thumbsup = "👍";

exports.run = async(bot, message, command, args) => {
    if(active){
        message.channel.send(`only one rollcall may be active at a time.`);
        return;
    }
    active = true;
    //message.delete(0);
    
    const embedOpen = new RichEmbed()
        .setTitle(`taking attendance for '${args}'`)
        .setColor(colors.gold)
        .setDescription('THUMBS UP to get credit');
    let msg = await message.channel.send(embedOpen);
    await msg.react(thumbsup);
    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === thumbsup, {time: 1000});
    let thumbreactions = await reactions.get(thumbsup);
    let users = thumbreactions.users.array().filter(x => x.id != process.env.BOT);
    await msg.delete();


    seq = await Sequence.findOneAndUpdate({_id:'raids'}, {$inc: {n:1}});
    logger.debug(seq);

    var r = new Raid ({
        _id: seq.n,
        date:Date.now(),
        description: args,
        enteredby: message.author.id,
        users: users.map(x => x.id),
        loots: [],
        value: 1
    });

    await r.save( function(err, doc) {
        if (err) return logger.error(err);

        logger.debug(JSON.stringify(doc));
        const embedClose = new RichEmbed()
            .setTitle(`raid: '${args}' entered`)
            .setColor(colors.orange)
            .setDescription(`id: ${doc.id}\n` +
                        `entered by: ${message.author.username}\n` +
                        `value: ${doc.value}\n` +
                        `users: [${users.map(x => x.username)}]\n` +
                        `loots: [${doc.loots}]`);
        message.channel.send(embedClose);
    });
    active = false;
  };