// The MESSAGE event runs anytime a message is received
// Note that due to the binding of bot to every event, every event
// goes `bot, other, args` when this function is run.
//const config = require('../config.json')
const logger = require('../utils/logger.js')

exports.run = (bot, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (!message.guild){
    return message.channel.send("This command is unavailable via private message.")
  }

  var prefixes = ['!','+','?','#','-']
  var prefix = message.content.charAt(0)
  if(!prefixes.includes(prefix)) return

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  let args = message.content.slice(prefix.length).trim().split(/ +/g)
  let command = args.shift().toLowerCase()
  //rejoin the args into one string. let the controller parse it how it wants
  args = args.join(' ')

  // If the command exists, **AND** the user has permission, run it.
  logger.cmd(`${message.author.username} ran command ${prefix}${command} args:{${args}}`)
  
  try {
    var prefixArray = [['!','command'],['+','create'],['?','read'],['#','update'],['-','delete']]
    var prefixMap = new Map(prefixArray)
    var baseCommand = command.split("/").shift() //this is basically the remainder of the command
    let routeFile = require(`../routes/${baseCommand}.js`)   
    
    routeFile[prefixMap.get(prefix)](bot, message,command, args)
  } catch (err) {
    logger.error(err)
  }
}