app.controller("weddingController", ['$scope', '$http', function ($scope, $http) {
    $scope.elasticSliderLoad = function(){
        elasticSliderLoad();
        return true;
    };
    $http.get('/data/slideshow.json').then(value => {
        $scope.dataArray = value.data;
    });
}]);