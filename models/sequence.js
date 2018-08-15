var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SequenceSchema = new Schema({
  _id: String,
  n: Number
})

exports = mongoose.model('Sequence', SequenceSchema)