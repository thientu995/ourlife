app.controller("albumController", ['$rootScope', '$scope', '$http', '$interval', function ($rootScope, $scope, $http, $interval) {
    $scope.itemSelectThumbnail = null;
    $scope.elasticSliderLoaded = false;
    $scope.getData({
        collection: 'album'
    }, function (value) {
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
            new ElasticSlider('.listSlider', {
                maxStretch: 100,
                bezierLen: 80
            });
            new SimpleBar(document.querySelector('.modalElasticslider'), {
                autoHide: false
            });
            $scope.elasticSliderLoaded = true;
        }
        return true;
    };

    $scope.selectThumbnail = function (item) {
        $scope.itemSelectThumbnail = item;
    }

    $scope.getStyleItem = function () {
        if ($scope.urlImgCurentSlider == null) {
            return {};
        }
        return {
            "background-image": "url(" + $(".elastic-slider .current img").attr('src') + ")",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center",
            "background-attachment": "fixed",
            "filter": "blur(15px) grayscale(100%)",
            "-webkit-filter": "blur(15px) grayscale(100%)",
            "top": "-50%",
            "width": "100vw",
            "height": "calc(100vh + 50%)",
            "position": "absolute",
        }
    }

    $scope.elasticSliderLoaded = null;
    $interval(function () {
        if ($scope.elasticSliderLoaded) {
            $scope.urlImgCurentSlider = $('.elastic-slider .current img').attr('src')
        }
    });

}]);