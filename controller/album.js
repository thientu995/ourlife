app.controller("albumController", ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
    $scope.itemSelectThumbnail = null;
    $scope.elasticSliderLoaded = false;
    $scope.getData({ collection: 'album' }, function (value) {
        $scope.dateListAlbum = value.data.sort((a, b) => {
            return b.date.seconds - a.date.seconds
        });

        angular.forEach($scope.dateListAlbum, (value, key) => {
            $http.get(settings.urlPageApp + 'googlephoto?idAlbum=' + value.id).then(res => {
                $scope.dateListAlbum[key].ListImage = res.data;
                $rootScope.isViewLoading = false;
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