app.controller("albumController", ['$scope', '$http', function ($scope, $http) {
    $scope.itemSelectThumbnail = null;
    $scope.elasticSliderLoaded = false;
    databaseProject.collection('album').get().then(col => {
        $scope.$apply(function () {
            $scope.dateListAlbum = col.docs.map(doc => doc.data()).sort((a, b) => {
                return b.date.seconds - a.date.seconds
            });

            angular.forEach($scope.dateListAlbum, (value, key) => {
                $http.get(settings.urlPageApp + 'googlephoto?url=' + $scope.dateListAlbum[key].url).then(res => {
                    $scope.dateListAlbum[key].ListImage = res.data;
                });
            });
        });
    });

    $scope.initThumbnail = function () {
        elasticsliderThumbnail();
        return true;
    }

    $scope.elasticSliderLoad = function (id) {
        if (!$scope.elasticSliderLoaded) {
            new ElasticSlider('.listSlider', { maxStretch: 100, bezierLen: 80 });
            new SimpleBar(document.querySelector('.modalElasticslider'), { autoHide: false });
            $scope.elasticSliderLoaded = true;
        }
        return true;
    };

    $scope.selectThumbnail = function (item) {
        $scope.itemSelectThumbnail = item;
    }
}]);