/*
stick helper functions needed in multiple files here until we find a better way to do it
*/

exports.findNickname = function (bot, message, id) {
    //console.log(bot.id || 'null bot')
    //console.log(message.id || 'null message')
    //console.log(id || 'null id')
    let member = message.guild.members.find(x => x.id == id)
    if(member && member.nickname) return member.nickname
    return bot.users.find(x => x.id == id).username   
}