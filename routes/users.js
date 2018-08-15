exports.read = (bot, message, command, args) => {
    var users = require('../controllers/users');
    users.list_all(bot, message, command, args);
  };