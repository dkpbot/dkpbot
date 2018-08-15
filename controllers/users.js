const mongoose = require('mongoose')
const User = mongoose.model('User')
const logger = require('../utils/logger.js')

logger.ok('controllers/users loaded')

exports.list_all = function(bot, message, command, args) {
  User.find({}, function(err, user) {
    if (err)
      logger.error(err)
    message.channel.send(JSON.stringify(user))
  })
}


/*

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body)
  new_task.save(function(err, task) {
    if (err)
      res.send(err)
    res.json(task)
  })
}


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err)
    res.json(task)
  })
}


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err)
    res.json(task)
  })
}


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err)
    res.json({ message: 'Task successfully deleted' })
  })
}*/