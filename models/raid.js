var mongoose = require('mongoose')
var Schema = mongoose.Schema

var LootSchema = new Schema({
  _id: Number,
  user: String,
  item: String,
  alt: { type: Boolean, default: false }
})

var RaidSchema = new Schema({
  _id: Number,
  date: { type: Date, default: Date.now },
  description: String,
  enteredby: String,
  value: Number,
  users:[String],
  loots:[LootSchema] 
})

exports = mongoose.model('Raid', RaidSchema)  