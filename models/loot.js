var mongoose = require('mongoose')
var Schema = mongoose.Schema

var LootSchema = new Schema({
  _id: Number,
  user: Number,
  item: String,
  alt: { type: Boolean, default: false }
})

//exports = mongoose.model('Loot', LootSchema)