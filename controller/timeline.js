app.controller("timelineController", ['$scope', '$http', function ($scope, $http) {
    $scope.elasticSliderLoad = function () {
        new ElasticSlider('.my-elastic-slider', { maxStretch: 100, bezierLen: 80 });
        return true;
    };
    $scope.styleElasticSliderLoad = function (item) {
        return {
            'background-image': 'url(' + item.src.getUrlImage() + ')'
        }
    }

    databaseProject.collection('slideshow').get().then(col => {
        $scope.$apply(function () {
            $scope.dataArray = col.docs.map(doc => doc.data())
        });
    });

    databaseProject.collection('portfolio').get().then(col => {
        $scope.$apply(function () {
            $scope.dataPortfolio = col.docs.map(doc => doc.data()).sort((a, b) => {
                return a.order - b.order
            });
        });
    });


    databaseProject.collection('timeline').get().then(col => {
        $scope.$apply(function () {
            $scope.dataTimeline = col.docs.map(doc => doc.data()).sort((a, b) => {
                return a.date.seconds - b.date.seconds
            });
        });
    });

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