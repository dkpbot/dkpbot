const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const LootSchema = require('./loot.js')

var LootSchema = new Schema({
  _id: Number,
  user: String,
  item: String,
  alt: { type: Boolean, default: false }
})

var RaidSchema = new Schema({
  _id: Number,
  date: { type: Date, default: Date.now },
  event: String,
  enteredby: String,
  value: Number,
  users: [String],
  loots: [LootSchema]
})

exports = mongoose.model('Raid', RaidSchema)  