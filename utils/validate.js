exports.user = function (user) {
    var regex = /<@!?(\d*)>$/
    return regex.test(user)
}

exports.channel = function (channel) {
    var regex = /<#(\d*)>$/
    return regex.test(channel)
}

exports.role = function (role) {
    var regex = /<@&(\d*)>$/
    return regex.test(role)
}