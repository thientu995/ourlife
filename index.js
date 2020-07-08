const path = require('path');
const express = require('express');
const functions = require('firebase-functions');
const cors = require('cors')

let host = 'http://localhost';
let port = process.env.PORT || 9000;
const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');

const app = express();
const pathHome = path.join(__dirname, './');
app.use(cors({ origin: true }))
app.use(express.static(pathHome));
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

app.get('/', require('./.build/route/index'));
app.get('/googlePhoto', require('./.build/route/googlePhoto'));

if (!process.env.PORT) {
    const server = app.listen(port, function () {
        // host = server.address().address;
        port = server.address().port;
        console.log('App running: ' + host + ':' + port);
        require('child_process').exec(start + ' ' + host + ':' + port);
    });
}

exports.app = functions.https.onRequest(app);