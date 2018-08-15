var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  id: Number,
  tag: String,
  username: String,
  main: String,
  chars: [{name:String,class:String}]
});

exports = mongoose.model('User', UserSchema);