const admin = require('firebase-admin');
const db = admin.firestore();


module.exports = function (req, res) {
    const collection = req.body.collection;
    const doc = req.body.doc;
    const typeMap = (req.body.typeMap || '').toLowerCase();
    const dbCollection = db.collection(collection);
    if (doc) {
        dbCollection.doc(doc).get().then(value => {
            let data = value.data();
            res.send(data);
        });
    }
    else {
        dbCollection.get().then(col => {
            const lstData = col.docs;
            let data = {};
            switch (typeMap) {
                case 'orign':
                    data = lstData;
                    break;
                case 'json':
                    lstData.map(doc => { return data[doc.id] = doc.data(); });
                    break;
                default:
                    data = lstData.map(doc => doc.data())
                    break;
            }
            res.send(data);
        });
    }
}