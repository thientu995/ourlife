const request = require('request');
const admin = require('firebase-admin');
const db = admin.firestore().collection('googlePhoto');

module.exports = function (req, res) {
    const idAlbum = req.query.idAlbum;
    const url = 'https://photos.app.goo.gl/' + idAlbum;
    let data = [];
    db.doc(idAlbum).get().then(value => {
        if (!value.exists) {
            request.get(url, (error, response, body) => {
                data = getImageInAlbum(body);
                db.doc(idAlbum).set({
                    createDate: new Date(),
                    order: 0,
                    value: data
                });
                res.send(data);
            });
        }
        else {
            res.send(value.data().value);
        }
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