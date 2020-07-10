const serviceApp = require('./app.service');
const path = require('path');
const compression = require('compression')
const express = require('express');
const cors = require('cors')
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const flatCache = require('flat-cache');
let flatCacheMiddleware = (req, res, next) => {
    let dateCurrent = getCurrent(new Date());
    let keyCache = (req.originalUrl || req.url).replace(new RegExp('/', 'g'), '');
    let key = JSON.stringify(req.body || '');
    key = key.replace(new RegExp('"', 'g'), '_')
        .replace(new RegExp(':', 'g'), '')
        .replace(new RegExp('{', 'g'), '')
        .replace(new RegExp('}', 'g'), '')
        .replace(new RegExp(',', 'g'), '')
        .replace(new RegExp('/', 'g'), '');
    key = dateCurrent + '/' + keyCache + '/' + key;
    let cache = flatCache.load(key, path.resolve('./cache'));
    let cacheContent = cache.getKey(key);
    if (cacheContent) {
        res.send(cacheContent);
    } else {
        if(cache.keys().length == 0){
            flatCache.clearAll(path.resolve('./cache'))
        }
        res.sendResponse = res.send
        res.send = (body) => {
            cache.setKey(key, body);
            cache.save();
            res.sendResponse(body)
        }
        next()
    }
};

function getCurrent(date) {
    let dateCurrent = date.getFullYear() + '';
    dateCurrent += date.getMonth() + '';
    dateCurrent += date.getDate() + '';
    return dateCurrent;
}


admin.initializeApp({
    credential: admin.credential.cert(serviceApp.FirebaseAdminSDK),
    databaseURL: "https://ourlife-t4vn.firebaseio.com"
});

let host = 'http://localhost';
let port = process.env.PORT || 9000;
const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');

const app = express();
const pathHome = path.join(__dirname, './');
app.use(cors({ origin: true }))
app.use(express.static(pathHome, {
    maxAge: '3600000' // uses milliseconds per docs
}));
app.use(express.urlencoded());
app.use(express.json());
app.use(compression({ filter: function () { return true; } }));
app.use(function (req, res, next) {
    var allowedOrigins = ['localhost', 't4vn.com'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', flatCacheMiddleware, require('./.build/route/index'));
app.get('/googlePhoto', flatCacheMiddleware, require('./.build/route/googlePhoto'));
app.post('/get', flatCacheMiddleware, require('./.build/route/firebase'));

const server = app.listen(port, function () {
    // host = server.address().address;
    if (!process.env.PORT) {
        // port = server.address().port;
        // console.log('App running: ' + host + ':' + port);
        // require('child_process').exec(start + ' ' + host + ':' + port);
    }
});

exports.app = functions.https.onRequest(app);