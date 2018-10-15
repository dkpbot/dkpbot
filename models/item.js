const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ItemSchema = new Schema({
    _id: String,
    name: String,
    value: String,
    img: String
})

exports = mongoose.model('Item', ItemSchema)  