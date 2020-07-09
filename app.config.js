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
app.run(['$window', '$rootScope', '$http', function ($window, $rootScope, $http) {
    $rootScope.getData = function (param, func) {
        $http.post(settings.urlPageApp + 'get', param).then(func);
    }

    new SimpleBar(document.querySelector('.floatyMenuWrapper'), { autoHide: false });

    new Floaty('#floatyMenu', {
        onActivate: function () {
            if (!$('.floatyMenuContainer').hasClass('active')) {
                simpleBarBody.getScrollElement().scrollTo(0, $('header').outerHeight());
            }
            $('.floatyMenuContainer,.button-floaty').toggleClass('active');
        }
    });

    $rootScope.getData({ collection: 'setting', doc: 'tagMeta' }, function (value) {
        const data = value.data;
        $rootScope.pageTitle = data.title;
        $rootScope.pageDescription = data.description;
        $window.document.querySelector('title').innerHTML = $rootScope.pageTitle;
    });

    $rootScope.isViewLoading = false;
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isViewLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
    });
    $rootScope.$on('$routeChangeError', function () {
    });

    
    // $window.document.getElementById('loading').style.display = 'none';
}]);