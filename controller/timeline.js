app.controller("timelineController", ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.styleElasticSliderLoad = function (item) {
        return {
            'background-image': 'url(' + item.src.getUrlImage() + ')'
        }
    }

    $scope.getData({ collection: 'portfolio' }, function (value) {
        $scope.dataPortfolio = value.data.sort((a, b) => {
            return a.order - b.order
        });
    });

    $scope.getData({ collection: 'timeline' }, function (value) {
        $scope.dataTimeline = value.data.sort((a, b) => {
            return a.date._seconds - b.date._seconds
        });
    });

    $rootScope.isViewLoading = false;

    let countLoad = 0;
    $scope.loadTimeLine = function () {
        if (countLoad != 1) {
            countLoad++;
        } else {
            setTimeout(() => {
                new horizontalTimeline();
            });
        }
    }
}]);