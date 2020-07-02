app.controller("slideShowController", function ($scope, $http) {
    $scope.dataArray = [];
    $scope.animation = function (index) {
        console.log($scope.dataArray)
        let timeChange = 5;
        let totalTime = $scope.dataArray.length * timeChange;
        return {
            'animation': totalTime + 's hero' + (Math.floor(Math.random() * 3)) + ' linear ' + index * timeChange + 's infinite',
        };
    }
    $http.get('/data/slideshow.json').then(value => {
        $scope.dataArray = value.data;
    });
});