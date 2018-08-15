const logger = require('../utils/logger.js')
module.exports.run =  function(bot) {
    logger.ok(`${bot.user.tag}, ready to serve ${bot.users.size} users in ${bot.guilds.size} servers.`, "ready")
    bot.user.setActivity(`!help`, {type:'WATCHING'})
  }