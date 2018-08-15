exports.command = (bot, message, command, args) => {
    var attendance = require('../controllers/attendance');
    attendance.run(bot, message, command, args);
  };