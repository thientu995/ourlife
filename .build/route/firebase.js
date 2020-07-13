const request = require('request');
const admin = require('firebase-admin');
const { copySync } = require('fs-extra');
const db = admin.firestore();


module.exports = function (req, res) {
    const collection = req.body.collection;
    const doc = req.body.doc;
    const typeMap = (req.body.typeMap || '').toLowerCase();
    getDb(collection, doc, typeMap).then(value => {
        res.send(value);
    });
}

async function getDb(collection, doc, typeMap) {
    const dbCollection = db.collection(collection);
    if (doc) {
        let getdata = await dbCollection.doc(doc).get();
        return getdata.data();
    }
    else {
        let getdata = await dbCollection.get();
        let lstData = getdata.docs;
        let data = {};
        if (collection == 'album') {
            return await getGooglePhoto(lstData);
        }
        switch (typeMap) {
            case 'orign':
                data = lstData;
                break;
            case 'json':
                data = convertArrayToJson(lstData);
                break;
            default:
                data = lstData.map(doc => doc.data())
                break;
        }
        return data
    }
}

function convertArrayToJson(lstData) {
    let data = {};
    lstData.map(doc => { return data[doc.id] = doc.data(); });
    return data;
}

async function getGooglePhoto(data) {
    data = convertArrayToJson(data);
    const lstKeys = Object.keys(data);
    let result = [];
    for (let i = 0; i < lstKeys.length; i++) {
        let value = data[lstKeys[i]];
        let getdata = await getDb('googlePhoto', value.id);
        if (getdata) {
            value.ListImage = getdata.value;
        }
        else {
            value.ListImage = await getListUrlGP(value.id);
        }
        if (value.ListImage.length != null && value.ListImage.length > 3) {
            result.push(value);
        }
    };
    return result;
}

function getListUrlGP(id) {
    return new Promise(function (resolve, reject) {
        const url = 'https://photos.app.goo.gl/' + id;
        request.get(url, (error, response, body) => {
            data = getImageInAlbum(body);
            db.collection('googlePhoto').doc(id).set({
                createDate: new Date(),
                order: 0,
                value: data
            });
            resolve(data);
        });
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