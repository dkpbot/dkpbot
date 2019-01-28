exports.user = function (user) {
    let regex = /<@!?(\d*)>$/
    let matches = user.match(regex)
    if (matches) {
        return matches[1]
    } else {
        return user
    }
}

exports.channel = function (channel) {
    let regex = /<#(\d*)>$/
    let matches = channel.match(regex)
    if (matches) {
        return matches[1]
    } else {
        return channel
    }
}

exports.role = function (role) {
    let regex = /<@&(\d*)>$/
    let matches = role.match(regex)
    if (matches) {
        return matches[1]
    } else {
        return role
    }
}