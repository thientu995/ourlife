app.controller("albumController", ['$rootScope', '$scope', '$http', '$interval', function ($rootScope, $scope, $http, $interval) {
    $scope.getData({ collection: 'album' }, function (value) {
        $scope.dateListAlbum = value.data.sort((a, b) => {
            return b.date.seconds - a.date.seconds
        });
        $rootScope.isViewLoading = false;
    });

    $scope.initThumbnail = function (id) {
        elasticsliderThumbnail(id);
        return true;
    }

    $scope.selectItem = function (item) {
        $scope.itemSelected = item;
    }

    $scope.elasticSliderLoad = function () {
        new ElasticSlider('.listSlider', {
            maxStretch: 100,
            bezierLen: 80
        });
        new SimpleBar(document.querySelector('.modalElasticslider'), {
            autoHide: false
        });
        return true;
    };

    $scope.getStyleItem = function (id) {
        if ($scope.urlImgCurentSlider == null) {
            return {};
        }
        return {
            "background-image": "url(" + $(".elastic-slider .current img").attr('src') + ")",
        }
    }

    $interval(function () {
        $scope.urlImgCurentSlider = $('.elastic-slider .current img').attr('src')
    });
}]);