const mongoose = require('mongoose');
const { Client, RichEmbed } = require('discord.js');
const logger = require('../utils/logger.js');
const colors = require('../utils/colors.js');
//const config = require('../config.json');
const Raid = mongoose.model('Raid');

exports.read_all = async (bot, message, args) => {
    logger.debug('raids.read_all');
    logger.debug(colors.red);
    raids = await Raid.find({}, function(err) {
        if (err) return logger.error(err);
    }).sort({date:-1});
    let description = '';
    raids.forEach(x => {
        description += `${x._id} [${x.date.toLocaleDateString()}] '${x.description}'\n`
    });
    if(description.length >0){
        description.slice(0,-1);
    }
    console.log(bot.user.avatarURL);
    const embed = new RichEmbed()
        .setTitle(`raids`)
        .setThumbnail('https://i.imgur.com/ephiFV7.png')
        .setColor(colors.cyan)
        .setDescription(description);
    let msg = await message.channel.send(embed);
};

exports.read_one = async (bot, message, raid_id, args) => {
    function findNickname(id){
        let member = message.guild.members.find(x => x.id == id);
        if(member && member.nickname) return member.nickname;
        return bot.users.find(x => x.id == id).username;   
    }
    logger.debug('raids.read_one');
    let r = await Raid.findOne({_id:raid_id}, function(err,doc) {
        if (err) return logger.error(err);
        if(!doc){
            logger.warn(`raid ${raid_id} not found`);
            return message.channel.send(`raid ${raid_id} not found`);
        }
        //console.log(findNickname(doc.users[0]));
        //console.log(doc.users.map(x => message.guild.members.find(x => x.id == x)));
        let usernames = doc.users.map(x => findNickname(x));  
        const embed = new RichEmbed()
        .setTitle(`raid: '${doc.description}' ${doc.date.toLocaleDateString()}`)
        .setColor(colors.cyan)
        .setDescription(`id: ${doc.id}\n` +
                        `date: ${doc.date.toLocaleDateString()}\n` +
                        `entered by: ${findNickname(doc.enteredby)}\n` +
                        `value: ${doc.value}\n` +
                        `users: [${usernames}]\n` +
                        `loots: [${doc.loots}]`);
        message.channel.send(embed);
    });
};

exports.read_users = async (bot, message, raid_id, args) => {
    logger.debug('raids.read_users');
    let r = await Raid.findOne({_id:raid_id}, function(err,doc) {
        if (err) return logger.error(err);

        let usernames = doc.users.map(x => message.guild.members.find(x => x.id == doc.enteredby));
        let description = '';
        if(doc.users.length > 0){
            doc.users.forEach(id => {
                description += `${id} ${message.guild.members.find(x => x.id == id)}`
                description.slice(0,-1);
            });
        } else {
            description = 'no users found';
        }
        const embed = new RichEmbed()
            .setTitle(`users: '${doc.description}' ${doc.date.toLocaleDateString()}`)
            .setColor(colors.cyan)
            .setDescription(description);
        message.channel.send(embed);
    });
};

exports.create_user = async (bot, message, raid_id, args) => {
    logger.debug('raids.create_user');
    //validate args
    var regex = /<@(\d*)>/;
    var matches = args.match(regex);
    if(!matches){
        return message.channel.send(`invalid user\n` +
                                    `example: +raids/${raid_id}/users @user`);
    }else var user = matches[1];

    //fetch raid
    let r = await Raid.findOne({_id:raid_id}, function(err) {
        if (err) return logger.error(err);
    });
    if(!r) {
        logger.warn(`raid ${raid_id} not found`);
        return message.channel.send(`raid ${raid_id} not found`);
    }
    //add user
    if(r.users.indexOf(user) === -1){
        r.users.push(user);
        logger.debug(`${r.users}`);

        await r.save( function(err, doc) {
            if (err) return logger.error(err);
            message.channel.send(`user added`);
            /*const embedClose = new RichEmbed()
                .setTitle(`raid: '${args}' entered`)
                .setColor(colors.orange)
                .setDescription(`id: ${doc.id}\n` +
                            `entered by: ${message.author.username}\n` +
                            `value: ${doc.value}\n` +
                            `users: [${users.map(x => x.username)}]\n` +
                            `loots: [${doc.loots}]`);
            message.channel.send(embedClose); */
        });
    }else{
        return message.channel.send(`user is already attending this raid`);
    }
        


};