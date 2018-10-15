const mongoose = require('mongoose')
const Schema = mongoose.Schema

var EventSchema = new Schema({
    _id: String,
    name: String,
    img: String
})

exports = mongoose.model('Event', EventSchema)  