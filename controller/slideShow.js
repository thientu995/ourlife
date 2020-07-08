app.controller("slideShowController", ['$scope', '$timeout', function ($scope, $timeout) {
    const timeChange = 10;
    let hero = null;
    databaseProject.collection('menu').get().then(col => {
        $scope.$apply(function () {
            $scope.dataArrayMenu = col.docs.map(doc => doc.data()).sort((a, b) => {
                return a.index - b.index
            });
        });
    });

    $scope.closeFloatyMenu = function () {
        $timeout(function () {
            $('.floatyMenuContainer,.button-floaty').toggleClass('active');
        });
    }

    databaseProject.collection('setting').doc('hero').get().then(doc => {
        $scope.$apply(function () {
            hero = doc.data().src
        });
    });
    databaseProject.collection('slideshow').get().then(col => {
        $scope.$apply(function () {
            $scope.dataArray = col.docs.map(doc => doc.data());
        });
    });

    databaseProject.collection('setting').doc('countdown').get().then(doc => {
        $scope.$apply(function () {
            new countdown('countdown', doc.data().value.seconds * 1e3).start();
        });
    });


    $scope.heroBg = function () {
        if (!hero) {
            return {};
        }
        return {
            'background-image': 'url(' + hero.getUrlImage() + ')'
        }
    }
    $scope.animation = function (self) {
        const total = $scope.dataArray.length;
        return {
            'background-image': 'url("' + self.item.src.getUrlImage() + '")',
            'animation-delay': (self.$index + 1) * timeChange + 's',
            'animation-duration': (total + 1) * timeChange + 's',
        };
    }
}]);