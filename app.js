const lstScreen = [{
        url: '/',
        controller: 'timeline'
    },
    {
        url: 'error',
        controller: 'error'
    },
];

new SimpleBar(document.getElementsByTagName('body')[0], {
    autoHide: false
});

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
const databaseProject = firebase.firestore();

const app = angular.module('myApp', ['ngRoute', 'ngSanitize']);
app.config(['$routeProvider', function ($routeProvider) {
    lstScreen.forEach(value => {
        $routeProvider.when(value.url, {
            templateUrl: './views/' + value.controller + '.html',
            controller: value.controller + 'Controller'
        });
    })
    $routeProvider.otherwise('/');;
}]);
app.run(['$window', '$rootScope', '$http', function ($window, $rootScope, $http) {
    databaseProject.collection('setting').doc('tagMeta').get().then(doc => {
        const data = doc.data();
        $rootScope.pageTitle = data.title;
        $rootScope.pageDescription = data.description;
        $window.document.querySelector('title').innerHTML = $rootScope.pageTitle;
    });

    $window.document.getElementById('loading').style.display = 'none';
}]);