var mongoose = require('mongoose')
var Schema = mongoose.Schema
//const Sequence = mongoose.model('Sequence')

var LootSchema = new Schema({
  _id: Number,
  user: Number,
  item: String,
  alt: { type: Boolean, default: false }
})

var RaidSchema = new Schema({
  _id: Number,
  date: { type: Date, default: Date.now },
  description: String,
  enteredby: Number,
  value: Number,
  users:[Number],
  loots:[LootSchema] 
})

exports = mongoose.model('Raid', RaidSchema)  