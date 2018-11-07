exports.user = function (id) {
    return `<@${id}>`
}

exports.channel = function (id) {
    return `<#${id}>`
}

exports.role = function (id) {
    return `<@&${id}>`
}