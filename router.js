const logger = require('./utils/logger.js')
const warning_view = require('./views/warning.js')

const routes = [
    [/\+raids\/(\d*)\/loots$/, './controllers/add_raid_loot'],
    [/\+raids\/(\d*)\/users$/, './controllers/add_raid_user'],
    [/\+raids$/, '../controllers/add_raid'],
    [/\!attendance$/, './controllers/attendance.js'],
    [/\!help$/, './controllers/help.js'],
    [/\?raids\/(\d*)\/loots$/, './controllers/list_raid_loots'],
    [/\?raids\/(\d*)\/users$/, './controllers/list_raid_users'],
    [/\?raids$/, './controllers/list_raids.js'],  
    [/\?raids\/(\d+)$/, './controllers/read_raid.js'],
    [/-raids\/(\d*)\/loots$/, './controllers/remove_raid_loot'],
    [/-raids\/(\d*)\/users$/, './controllers/remove_raid_user'],   
    [/-raids$/, './controllers/delete_raid']
]

function can_access(req, controller){
    if(!controller.roles) return true
    let roles = controller.roles.split(',')
    return roles.some(x => {
        let role = req.message.guild.roles.find("name", x)
        if(role){
            if(req.message.member.roles.has(role.id)){
                return true;
            }
        }
    })
}

exports.route = function(req){
    routes.some(x =>{
        let matches = req.command.match(x[0])
        if(matches){
            logger.route(`matched regex ${x[0]}`)
            let controller = require(x[1])
            if(can_access(req, controller)){
                if(req.args === 'help'){
                    controller.help(req)
                }
                else{
                    controller.run(req, matches)
                }
            }
            else{
                warning_view.send(req, "insufficient permissions")
            }
            return true
        }
    })
}

exports.test = function(req){

}