const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../utils/logger.js')
const colors = require('../../utils/colors.js')
const utils = require('../../utils/utils')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/users/delete loaded')

exports.run = async (req, matches) => {
    //validate args
    let user = matches[1]
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}