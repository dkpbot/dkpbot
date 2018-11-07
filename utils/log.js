/*
class for easy and aesthetically pleasing console logging 
*/
const chalk = require("chalk")
const moment = require("moment")

exports.view = (content) => {
  const type = 'view'
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`
  return console.log(`${timestamp} [${chalk.magenta(type.toUpperCase())}] ${content}`)
}
exports.ok = (content) => {
  const type = 'ok'
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`
  return console.log(`${timestamp} [${chalk.green(type.toUpperCase())}] ${content}`)
}
exports.warn = (content) => {
  const type = 'warn'
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`
  return console.log(`${timestamp} [${chalk.keyword('orange')(type.toUpperCase())}] ${content}`)
}
exports.error = (content) => {
  const type = 'error'
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`
  return console.log(`${timestamp} [${chalk.red(type.toUpperCase())}] ${content}`)
}
exports.cmd = (content) => {
  const type = 'cmd'
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`
  return console.log(`${timestamp} [${chalk.cyan(type.toUpperCase())}] ${content}`)
}
exports.debug = (content) => {
  const type = 'debug'
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`
  return console.log(`${timestamp} [${chalk.white(type.toUpperCase())}] ${content}`)
}