const request = require('request');
module.exports = function (req, res) {
    request.get(req.query.url, (error, response, body) => {
        res.send(getImageInAlbum(body));
    });
}

function getImageInAlbum(content) {
    const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g
    const links = new Set()
    let match
    while (match = regex.exec(content)) {
        links.add(match[1])
    }
    return Array.from(links)
}