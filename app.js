const lstController = [
    {
        url: 'slideShow',
        controller: 'slideShow'
    },
    {
        url: 'footer',
        controller: 'footer'
    },
    {
        url: '/',
        controller: 'timeline'
    },
    {
        url: 'error',
        controller: 'error'
    },
];
const lstLibs = [
    //Angular
    './libs/angularjs/angular-sanitize.min.js',
    './libs/angularjs/angular-route.min.js',
    //jQuery
    './libs/popper.min.js',
    './libs/snap.svg-min.js',
    './libs/bootstrap/bootstrap.min.js',
    //Custom
    './libs/custom/elasticSlider.js',
    './libs/custom/horizontalTimeline.js',
    './libs/custom/countdown.js'
];
const lstCss = [
    './assets/css/scrollbar.css',
    './libs/font-awesome-4.7.0/css/font-awesome.min.css',
    './libs/bootstrap/bootstrap.min.css',
    './assets/css/hero.css',
    './assets/css/elasticSlider.css',
    './assets/css/scrollSlider.css',
    './assets/css/horizontalTimeline.css',
    './assets/css/countdownHeart.css',
    './assets/css/style.css',
];
firebase.initializeApp({
    apiKey: "AIzaSyBcJ-Sc3Sc4cGVJBsy-51Sx-XFkux_6wHA",
    authDomain: "ourlife-t4vn.firebaseapp.com",
    databaseURL: "https://ourlife-t4vn.firebaseio.com",
    projectId: "ourlife-t4vn",
    storageBucket: "ourlife-t4vn.appspot.com",
    messagingSenderId: "655110589783",
    appId: "1:655110589783:web:263f20d1fe4d4b02f94212",
    measurementId: "G-FB8LEED8SN"
});
const app = angular.module(document.querySelector('body').id, ['ngRoute', 'ngSanitize']);

const databaseProject = firebase.firestore();
window.addEventListener('DOMContentLoaded', function () {
    new SimpleBar(document.querySelector('body'), { autoHide: false });
    let promises = [];
    lstLibs.forEach(value => { promises.push(createScript(value)); });
    promises.push(createScript('./app.cmfunc.js'));
    promises.push(createScript('./app.config.js'));
    lstController.forEach(value => { promises.push(createScript('./controller/' + value.controller + '.js')); });
    lstCss.forEach(value => { createStyle(value) });

    Promise.all(promises).then(angular.bootstrap.bind(null, document, [document.querySelector('body').id]));
    return;
    function createScript(src) {
        let promise = new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            script = document.createElement('script');
            script.defer = 'defer';
            script.setAttribute('src', src);
            script.addEventListener('load', resolve.bind(null, script));
            document.querySelector('body').appendChild(script);
            return script;
        });
        return promise;
    }

    function createStyle(src) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src;
        document.querySelector('body').appendChild(link);
    }
});
