// The MESSAGE event runs anytime a message is received
// Note that due to the binding of bot to every event, every event
// goes `bot, other, args` when this function is run.

const logger = require('../utils/logger.js')
const router = require('../router.js')
//views
const error_view = require('../views/error.js')

exports.run = (bot, message) => {
  // ignore other bots
  if (message.author.bot) return

  if (!message.guild){
    return error_view.render(req, "This command is unavailable via private message.")
  }

  let prefixes = ['!','+','?','#','-']
  let prefix = message.content.charAt(0)
  if(!prefixes.includes(prefix)) return

  //seperate command from args
  let args = message.content.trim().split(/ +/g)
  let command = args.shift().toLowerCase()
  args = args.join(' ')

  logger.cmd(`${message.author.username}: ${command} ${args}`)
  let req = {'bot':bot,'message':message,'command':command,'args':args}
  try {
    router.route(req)
  } catch (err) { 
      error_view.render(req, err)
  }
}