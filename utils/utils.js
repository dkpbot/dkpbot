/*
stick helper functions needed in multiple files here until we find a better way to do it
*/

exports.findUsername = function(guild, id){
    //console.log(guild);
    //console.log(id);
    console.log(guild.members.find(id));
    console.log(guild.members.get(id));
    let user = guild.members.find(x => x.id == id);
    if(user) return user.username;
    return id;
}