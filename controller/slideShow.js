app.controller("slideShowController", ['$scope', '$timeout', function ($scope, $timeout) {
    const timeChange = 10;
    $scope.getData({ collection: 'menu' }, function (value) {
        $scope.dataArrayMenu = value.data.sort((a, b) => { return a.index - b.index });
    });

    $scope.closeFloatyMenu = function () {
        $timeout(function () {
            $('.floatyMenuContainer,.button-floaty').toggleClass('active');
        });
    }

    $scope.getData({ collection: 'slideshow' }, function (value) {
        $scope.dataArray = value.data;
    });

    $scope.getData({ collection: 'setting', typeMap: 'json' }, function (value) {
        new countdown('countdown', value.data.countdown.value._seconds * 1e3).start();
        $scope.heroBg = {
            'background-image': 'url(' + value.data.hero.src.getUrlImage() + ')'
        }
    });

    $scope.animation = function (self) {
        const total = $scope.dataArray.length;
        return {
            'background-image': 'url("' + self.item.src.getUrlImage() + '")',
            'animation-delay': (self.$index + 1) * timeChange + 's',
            'animation-duration': (total + 1) * timeChange + 's',
        };
    }
}]);