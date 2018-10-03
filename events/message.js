// The MESSAGE event runs anytime a message is received
// Note that due to the binding of bot to every event, every event
// goes `bot, other, args` when this function is run.

const logger = require('../utils/logger.js')
const router = require('../router.js')
//views
const error_view = require('../views/error.js')

exports.run = (bot, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (!message.guild){
    return error_view.send(req, "This command is unavailable via private message.")
  }

  //let prefixes = {'!':'command','+':'create','?':'read','#':'update','-':'delete'}
  let prefixes = ['!','+','?','#','-']
  let prefix = message.content.charAt(0)
  if(!prefixes.includes(prefix)) return

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  let args = message.content.trim().split(/ +/g)
  let command = args.shift().toLowerCase()
  //rejoin the args into one string. let the controller parse it how it wants
  args = args.join(' ')

  logger.cmd(`${message.author.username}: ${command} ${args}`)
  let req = {'bot':bot,'message':message,'command':command,'args':args}
  try {
    router.route(req)
  } catch (err) { 
      error_view.send(req, err)
  }
}