const path = require('path');
const express = require('express');
const functions = require('firebase-functions');
let host = 'http://localhost';
let port = 0;
const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');

const app = express();
const pathHome = path.join(__dirname, './');
app.use(express.static(pathHome));

app.get('/', require('./.build/route/index'));
app.get('/googlePhoto', require('./.build/route/googlePhoto'));

const server = app.listen(port, function () {
    // host = server.address().address;
    port = server.address().port;
    console.log('App running: ' + host + ':' + port);
    require('child_process').exec(start + ' ' + host + ':' + port);
});

exports.app = functions.https.onRequest(app);