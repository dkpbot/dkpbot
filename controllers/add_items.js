require('dotenv').config()
const logger = require('../utils/logger.js')
//views
const ok_view = require('../views/ok.js')

const createRole = async (req, name) => {
    return req.message.guild.createRole({
        name: name,
        color: '0xFF00FF',
        mentionable: true,
        permissions: []
    })
}

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
    ok_view.send(req, text)
}

exports.roles = process.env.EDITOR_ROLES

/*
aegis of ice,belt of dwarf slaying,frostreaver,frostreavers embroidered cloak,frostreavers velium crown,
ring of winter,tri-plated golen hackle hammer,ring of dain frostreaver iv,crown of narandi,eye of narandi,
earring of the frozen skull,faceguard of bentos the hero,choker of the wretched,cowl of mortality,
cracked claw of zlandicar,first brood talisman,frakadars talisman,guantlets of mortality,massive dragonclaw shard,
zlandicars heart,zlandicars talisman,axe of the kromzek kings,boots of the storm,ring of lightning,
crown of the kromzek kings,the horn of hsagra,velium encrusted gauntlets,king tormaxs head,white dragon scale sash,
wrist guard of thunder,boots of the vindicator,chestplate of vindication,earring of living thunder,
breastplate of eradication,cloak of the falling stars,hammer of battle,iron scroll of war,reaver,swiftblade of zek,
blade of carnage,flayed barbarian hide mask,flayed barbarian skin leggings,helmet of rallos zek,ring of destruction,

war bow of rallos zek,bracelet of protection,cloak of silver eyes,eye of the rigtorgn,rekeklos war sword,
shovel of the harvest,unopenable box,wand of the black dragon eye,boots of superiority,breastplate of superiority,
gloves of stability,lendiniaras talisman,mask of superiority,ring of relkententinar,silver girdle of stability,
truesight helmet,velium maul of superiority,black rock maul of crushing,circlet of suffering,emerald bastardsword of purity,
necklace of nightstalking,pauldrons of blight,transparent eyepatch,true mithril breastplate,boots of deep thought,
boots of silent striding,buckler of insight,cloak of the fire storm,earring of the living flame,mask of the silver eyes,
pauldrons of the deep flame,serrated dragon tooth,silver bracelet of speed,silver charm of tranquility,silver mask of the slayer,
white dragon idol,white dragon statue,shield of fury,shield of the protector,bow of the silver fang,barrier of sound,
shield of dragonkind,shield of the wurms,shield of thorns,melodic charm,runed fang necklace,
shadow fang necklace,silent fang necklace,ring of superiority,amulet of the dreadgazer,circlet of summer,
hand of the master,katana of pain,mask of fall,reapers ring
*/