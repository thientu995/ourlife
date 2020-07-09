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
    //Angular
    './libs/angularjs/angular-sanitize.min.js',
    './libs/angularjs/angular-route.min.js',
    //jQuery
    './libs/jquery/jquery.slimscroll.min.js',
    './libs/popper.min.js',
    './libs/snap.svg-min.js',
    './libs/bootstrap/bootstrap.min.js',
    //Custom
    './libs/custom/lazyImage.js',
    './libs/custom/floaty.js',
    './libs/custom/elasticSlider.js',
    './libs/custom/elasticsliderThumbnail.js',
    './libs/custom/horizontalTimeline.js',
    './libs/custom/countdown.js'
];
const lstCss = [
    './assets/css/scrollbar.css',
    './libs/font-awesome-4.7.0/css/font-awesome.min.css',
    './libs/bootstrap/bootstrap.min.css',
    './assets/css/floaty.css',
    './assets/css/hero.css',
    './assets/css/elasticSlider.css',
    './assets/css/elasticsliderThumbnail.css',
    './assets/css/scrollSlider.css',
    './assets/css/horizontalTimeline.css',
    './assets/css/countdownHeart.css',
    './assets/css/thumbnail.css',
    './assets/css/style.css',
];
window.simpleBarBody = new SimpleBar(document.querySelector('body'), { autoHide: false });
const app = angular.module(document.querySelector('body').id, ['ngRoute', 'ngSanitize', 'lazyLoadingImageBetter']);

const settings = {
    // urlPageApp: '/',
    urlPageApp: 'https://ourlife-t4vn.herokuapp.com/'
}
window.addEventListener('DOMContentLoaded', function () {
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
        createLinkPreload(src, 'script');
        return promise;
    }

    function createStyle(src) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src;
        document.querySelector('head').appendChild(link);
        createLinkPreload(src, 'style');
    }

    function createLinkPreload(src, type) {
        let link = document.createElement('link');
        link.rel = 'preload';
        link.as = type;
        link.href = src;
        document.querySelector('head').appendChild(link);
    }
});
