app.controller("albumController", ['$rootScope', '$scope', '$http', '$interval', function ($rootScope, $scope, $http, $interval) {
    $scope.model = {
        lstAlbum: [],
        searchAlbum: ''
    };
    let lstAlbumOrign = [];
    $scope.getData({ collection: 'album' }, function (value) {
        lstAlbumOrign = $scope.model.lstAlbum = value.data.sort((a, b) => {
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
            "background-image": "url(" + $scope.urlImgCurentSlider + ")",
        }
    }

    $interval(function () {
        $scope.urlImgCurentSlider = $('.elastic-slider .current img').attr('src')
    });

    $scope.searchAlbum = function () {
        let valueSearch = $scope.model.searchAlbum.toLowerCase();
        if (valueSearch.length == 0) {
            $scope.model.lstAlbum = lstAlbumOrign;
        }
        else {
            $scope.model.lstAlbum = lstAlbumOrign.filter(x => x.title.toLowerCase().includes(valueSearch));
        }
    }
}]);