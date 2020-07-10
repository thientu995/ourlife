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
        url: 'footer',
        controller: 'footer'
    },
    {
        url: '',
        controller: 'timeline'
    },
    {
        url: 'error',
        controller: 'error'
    },
];
const lstLibs = [
    'libs/simplebar/simplebar.min.js',
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
    'libs/simplebar/simplebar.css',
    'assets/css/scrollbar.css',
    'libs/font-awesome-4.7.0/css/font-awesome.min.css',
    'libs/bootstrap/bootstrap.min.css',
    'assets/css/floaty.css',
    'assets/css/hero.css',
    'assets/css/elasticSlider.css',
    'assets/css/elasticsliderThumbnail.css',
    'assets/css/scrollSlider.css',
    'assets/css/horizontalTimeline.css',
    'assets/css/countdownHeart.css',
    'assets/css/thumbnail.css',
    'assets/css/style.css',
];
// const app = angular.module(document.querySelector('body').id, ['ngRoute', 'ngSanitize']);

const settings = {
    // urlPageApp: '/',
    urlPageApp: 'https://ourlife-t4vn.herokuapp.com/',
}
const homeScript = '/';

// window.addEventListener('DOMContentLoaded', function () {
createStyle('assets/css/loading.css')
lstCss.forEach(value => { createStyle(value) });
let promisesMain = [];
promisesMain.push(createScript('libs/angularjs/angular.min.js'));
promisesMain.push(createScript('libs/jquery/jquery-3.5.1.min.js'));
Promise.all(promisesMain).then(async function () {
    let promises = [];

    lstLibs.forEach(async (value) => {
        await createScript(value).then(() => {
            console.log(value)
        });
    });
    await createScript('app.cmfunc.js');
    await createScript('app.config.js');

    lstController.forEach(value => { promises.push(createScript('controller/' + value.controller + '.js')); });
    Promise.all(promises).then(angular.bootstrap.bind(null, document, [document.querySelector('body').id]));
});
// return;
function createScript(src) {
    src = homeScript + src;
    let promise = new Promise(function (resolve, reject) {
        let script = document.createElement('script');
        script = document.createElement('script');
        // script.defer = 'defer';
        script.setAttribute('src', src);
        script.addEventListener('load', function () {
            resolve.
            resolve.call(null, script);
        });
        document.querySelector('body').appendChild(script);
        return script;
    });
    createLinkPreload(src, 'script');
    return promise;
}

function createStyle(src) {
    src = homeScript + src;
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    document.querySelector('body').appendChild(link);
    createLinkPreload(src, 'style');
}

function createLinkPreload(src, type) {
    let link = document.createElement('link');
    link.rel = 'preload';
    link.as = type;
    link.href = src;
    document.querySelector('head').appendChild(link);
}
// });
