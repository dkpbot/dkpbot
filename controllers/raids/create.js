const mongoose = require('mongoose')
const { Client, RichEmbed } = require('discord.js')
const logger = require('../../utils/logger.js')
const colors = require('../../utils/colors.js')
const utils = require('../../utils/utils')
//models
const Raid = mongoose.model('Raid')

logger.ok('controllers/raids/read_one loaded')

exports.run = async (req, matches) => {
    logger.debug(matches)
    let raid_id = matches[1]
    
}

exports.help = async (req, matches) => {
    
}

exports.test = async (req, matches) => {
    
}