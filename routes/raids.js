const logger = require('../utils/logger.js');
const raids = require('../controllers/raids');
//var route = function (regex,)
exports.create = (bot, message, command, args) => {
    //command starts with +
    // only use on collections

    //?raids
    var regex = /raids$/;
    var matches = command.match(regex);
    if(matches){
        logger.debug(`matched ${regex}`);
        //return raids.read_all(bot, message, args);
    }
    //raids/123/users
    regex = /raids\/(\d*)\/users$/;
    matches = command.match(regex);
    if(matches){
        logger.debug(`matched ${regex} {id: ${matches[1]}}`);
        return raids.create_user(bot, message, matches[1], args);
    }
};

exports.read = (bot, message, command, args) => {
    //command starts with ?

    //?raids
    var regex = /raids$/;
    var matches = command.match(regex);
    if(matches){
        logger.debug(`matched ${regex}`);
        return raids.read_all(bot, message, args);
    }
    //raids/123
    regex = /raids\/(\d+)$/;
    matches = command.match(regex);
    if(matches){
        logger.debug(`matched ${regex} {id: ${matches[1]}}`);
        return raids.read_one(bot, message, matches[1], args);
    }
    //raids/123/users
    regex = /raids\/(\d*)\/users$/;
    matches = command.match(regex);
    if(matches){
        logger.debug(`matched ${regex} {id: ${matches[1]}}`);
        return raids.read_users(bot, message, matches[1], args);
    }

};

exports.update = (bot, message, command, args) => {

};

exports.delete = (bot, message, command, args) => {

};