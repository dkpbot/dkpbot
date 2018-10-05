exports.user = function (user){
    var regex = /<@(\d*)>/
    return regex.test(user)
}

exports.channel = function (user){
    var regex = /<#(\d*)>/
    return regex.test(user)
}

exports.role = function (user){
    var regex = /<@&(\d*)>/
    return regex.test(user)
}