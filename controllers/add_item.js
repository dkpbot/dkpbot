require('dotenv').config()
const logger = require('../utils/logger.js')
//views
const ok_view = require('../views/ok.js')

//bot user must have 'magage roles' and 'manage channels' permissions on discord
exports.run = async (req, matches) => {
    //roles = process.env.ITEMS.split(',')
    let text = '';
    items = req.args.split(',')
    items.forEach(async x => {
        if (x === '') return
        x = x.replace("\n", "")
        let role = await req.message.guild.roles.find('name', x)
        if (role) {
            logger.warn(`role exists: "${x}" <@&${role.id}>`)
            text += `role exists: <@&${role.id}>\n`
        }
        else {
            let role = await req.message.guild.createRole({
                name: x,
                color: '0xFF00FF',
                mentionable: true,
                permissions: []
            })
            logger.ok(`creating role: "${x}" <@&${role.id}>`)
            text += `creating role: <@&${role.id}>\n`
            //store item / id tuple in database
        }
    })
    ok_view.render(req, text)
}

exports.roles = process.env.EDITOR_ROLES