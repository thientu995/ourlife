const lstScreen = [
    {
        url: '/',
        controller: 'wedding'
    },
    {
        url: 'error',
        controller: 'error'
    },
];

let app = angular.module("myApp", ["ngRoute", 'jkAngularCarousel']);
app.config(function ($routeProvider) {
    lstScreen.forEach(value => {
        $routeProvider.when(value.url, {
            templateUrl: './views/' + value.controller + '.html',
            controller: value.controller + 'Controller'
        });
    })
    $routeProvider.otherwise('/');;
});
app.run(function ($window, $rootScope, $http) {
    $rootScope.pageTitle = 'Our life';
    $rootScope.pageDescription = 'Our life';
    $rootScope.pageMeta = 'Our life';
    $window.document.querySelector('title').innerHTML = $rootScope.pageTitle;
    
    $window.document.getElementById('loading').style.display = 'none';
});