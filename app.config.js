app.config(['$routeProvider', function ($routeProvider) {
    lstController.forEach(value => {
        $routeProvider.when(value.url, {
            templateUrl: './views/' + value.controller + '.html',
            controller: value.controller + 'Controller'
        });
    });
    $routeProvider.otherwise('/');;
}]);
app.run(['$window', '$rootScope', function ($window, $rootScope) {
    databaseProject.collection('setting').doc('tagMeta').get().then(doc => {
        const data = doc.data();
        $rootScope.pageTitle = data.title;
        $rootScope.pageDescription = data.description;
        $window.document.querySelector('title').innerHTML = $rootScope.pageTitle;
    });

    $window.document.getElementById('loading').style.display = 'none';
}]);