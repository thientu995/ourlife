app.config(['$sceDelegateProvider', '$routeProvider', function ($sceDelegateProvider, $routeProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self']);
    lstController.forEach(value => {
        $routeProvider.when('/' + value.url, {
            templateUrl: './views/' + value.controller + '.html',
            controller: value.controller + 'Controller'
        });
    });
    $routeProvider.otherwise('/');;
}]);
app.run(['$window', '$rootScope', function ($window, $rootScope) {
    let simpleBarBody = new SimpleBar(document.querySelector('body'), { autoHide: false });
    new SimpleBar(document.querySelector('.floatyMenuWrapper'), { autoHide: false });

    new Floaty('#floatyMenu', {
        onActivate: function () {
            $('.floatyMenuContainer,.button-floaty').toggleClass('active');
            simpleBarBody.getScrollElement().scrollTo(0, 1000);
        }
    });

    databaseProject.collection('setting').doc('tagMeta').get().then(doc => {
        const data = doc.data();
        $rootScope.pageTitle = data.title;
        $rootScope.pageDescription = data.description;
        $window.document.querySelector('title').innerHTML = $rootScope.pageTitle;
    });

    $window.document.getElementById('loading').style.display = 'none';
}]);