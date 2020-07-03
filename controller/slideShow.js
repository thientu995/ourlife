app.controller("slideShowController", ['$scope', '$http', '$window', '$timeout', '$interval', function ($scope, $http, $window, $timeout, $interval) {
    $scope.dataArray = [];
    const timeChange = 4;
    $scope.animation = function (index) {
        return {
            'animation-delay': index * timeChange + 's',
            'animation-duration': $scope.dataArray.length * timeChange + 's',
        };
    }
    $http.get('/data/slideshow.json').then(value => {
        $scope.dataArray = value.data;
    });
}]);