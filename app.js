const lstController = [
    {
        url: 'slideShow',
        controller: 'slideShow'
    },
    {
        url: 'album',
        controller: 'album'
    },
    {
        url: '',
        controller: 'timeline'
    },
    {
        url: 'floatMenu',
        controller: 'floatMenu'
    },
    {
        url: 'footer',
        controller: 'footer'
    },
    {
        url: 'error',
        controller: 'error'
    },
];
const lstLibs = [
    //Angular
    'libs/angularjs/angular-sanitize.min.js',
    'libs/angularjs/angular-route.min.js',
    //jQuery
    // 'libs/jquery/jquery.slimscroll.min.js',
    'libs/popper.min.js',
    'libs/snap.svg-min.js',
    'libs/bootstrap/bootstrap.min.js',
    //Custom
    'libs/custom/lazyImage.js',
    'libs/custom/floaty.js',
    'libs/custom/elasticSlider.js',
    'libs/custom/elasticsliderThumbnail.js',
    'libs/custom/horizontalTimeline.js',
    'libs/custom/countdown.js'
];
const lstCss = [
    // 'libs/font-awesome-4.7.0/css/font-awesome.min.css',
    'libs/bootstrap/bootstrap.min.css',
    'assets/css/style.css',
    'assets/css/scrollbar.css',
    'assets/css/inputSearch.css',
    'assets/css/floaty.css',
    'assets/css/hero.css',
    'assets/css/elasticSlider.css',
    'assets/css/elasticsliderThumbnail.css',
    'assets/css/horizontalTimeline.css',
    'assets/css/countdownHeart.css',
    'assets/css/thumbnail.css',
];
// const app = angular.module(document.querySelector('body').id, ['ngRoute', 'ngSanitize']);

const settings = {
    urlPageApp: '/',
    // urlPageApp: 'https://ourlife-t4vn.herokuapp.com/',
}
const homeScript = '/';

// window.addEventListener('DOMContentLoaded', function () {
createStyle('assets/css/loading.css')
lstCss.forEach(value => {
    createStyle(value)
});
let promisesMain = [];
promisesMain.push(createScript('libs/angularjs/angular.min.js'));
promisesMain.push(createScript('libs/jquery/jquery-3.5.1.min.js'));
promisesMain.push(createScript('libs/simplebar/simplebar.min.js'));
Promise.all(promisesMain).then(function () {
    let promisesLib = [];
    lstLibs.forEach(value => {
        promisesLib.push(createScript(value));
    });
    Promise.all(promisesLib).then(function () {
        createScript('app.cmfunc.js').then(function () {
            createScript('app.config.js').then(function () {
                let promises = [];
                lstController.forEach(value => {
                    promises.push(createScript('controller/' + value.controller + '.js'));
                });
                Promise.all(promises).then(angular.bootstrap.bind(null, document, [document.querySelector('body').id]));
            });
        });
    })
});
// return;
function createScript(src) {
    src = homeScript + src;
    createLinkPreload(src, 'script');
    let promise = new Promise(function (resolve, reject) {
        let script = document.createElement('script');
        script = document.createElement('script');
        // script.defer = 'defer';
        script.async = 'async';
        script.setAttribute('src', src);
        script.addEventListener('load', resolve.bind(null, script));
        document.querySelector('body').appendChild(script);
        return script;
    });
    return promise;
}

function createStyle(src) {
    src = homeScript + src;
    createLinkPreload(src, 'style');
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    document.querySelector('body').appendChild(link);
}

function createLinkPreload(src, type) {
    let link = document.createElement('link');
    link.rel = 'preload';
    link.as = type;
    link.href = src;
    document.querySelector('head').appendChild(link);
}
// });