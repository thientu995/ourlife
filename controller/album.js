app.controller("albumController", ['$rootScope', '$scope', '$http', '$interval', function ($rootScope, $scope, $http, $interval) {
    $scope.model = {
        lstAlbum: [],
        searchAlbum: ''
    };
    let lstAlbumOrign = [];
    $scope.getData({
        collection: 'album'
    }, function (value) {
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

    $scope.$watch(function () {
        return angular.element('.elastic-slider .current img').attr('src')
    }, function (newValue) {
        $scope.urlImgCurentSlider = newValue
    });

    $scope.searchAlbum = function () {
        let valueSearch = $scope.model.searchAlbum.toLowerCase();
        if (valueSearch.length == 0) {
            $scope.model.lstAlbum = lstAlbumOrign;
        } else {
            $scope.model.lstAlbum = lstAlbumOrign.filter(x => x.title.toLowerCase().includes(valueSearch));
        }
    }

    let setBkg = null;
    $('#modalAlbum').on('show.bs.modal', function () {
        if(setBkg == null){
            setBkg = setInterval(function () {
                $scope.$apply();
                console.log(12321)
            }, 500);
        }
    });
    $('#modalAlbum').on('hide.bs.modal', function () {
        clearInterval(setBkg);
        setBkg = null;
    });
}]);