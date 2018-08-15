var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RaidSchema = new Schema({
  _id: Number,
  date: Date,
  description: String,
  enteredby: Number,
  value: Number,
  users:[Number],
  loots:[{user:Number, item:String, alt:Boolean}] 
})

exports = mongoose.model('Raid', RaidSchema)