const log = require('../../utils/log.js')
const validate = require('../../utils/validate.js')
const parse = require('../../utils/parse.js')
const cast = require('../../utils/cast.js')
//views
const ok_view = require('../../views/ok.js')

//bot user must have 'magage roles' and 'manage channels' permissions on discord
exports.run = async (req, matches) => {
    let text = '';
    items = req.args.split(',')
    items.forEach(async x => {
        if (x === '') return
        x = x.replace("\n", "")
        let role = await req.message.guild.roles.find('name', x)
        if (role) {
            log.warn(`role exists: "${x}" ${cast.role(role.id)}`)
            text += `role exists: ${cast.role(role.id)}\n`
        }
        else {
            let role = await req.message.guild.createRole({
                name: x,
                color: '0xFF00FF',
                mentionable: true,
                permissions: []
            })
            log.ok(`creating role: "${x}" ${cast.role(role.id)}`)
            text += `creating role: ${cast.role(role.id)}\n`
            //store item / id tuple in database
        }
    })
    ok_view.render(req, text)
}