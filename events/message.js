// The MESSAGE event runs anytime a message is received
// Note that due to the binding of bot to every event, every event
// goes `bot, other, args` when this function is run.

const logger = require('../utils/logger.js')
const broken = '🤕'

exports.run = (bot, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (!message.guild){
    return message.channel.send("This command is unavailable via private message.")
  }

  let prefixes = {'!':'command','+':'create','?':'read','#':'update','-':'delete'}
  let prefix = message.content.charAt(0)
  if(!prefixes[prefix]) return

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  let args = message.content.slice(prefix.length).trim().split(/ +/g)
  let command = args.shift().toLowerCase()
  //rejoin the args into one string. let the controller parse it how it wants
  args = args.join(' ')

  logger.cmd(`${message.author.username}: ${prefix}${command} ${args}`)
  try {
    let req = {'bot':bot,'message':message,'command':command,'args':args}
    let router = require(`../routes/${prefixes[prefix]}.js`)
    router.route(req)
  } catch (err) { 
      message.channel.send(`\`\`\`${broken} [ERROR] ${err}\`\`\``)
      logger.error(err)
  }
}