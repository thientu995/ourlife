app.controller("footerController", ['$scope', '$http', '$window', function ($scope) {
    databaseProject.collection('setting').doc('footer').get().then(doc => {
        $scope.$apply(function () {
            $scope.footer = doc.data().src
            $scope.text = doc.data().text
        });
    });

    $scope.image = function () {
        if ($scope.footer) {
            return {
                'background-image': 'url("' + $scope.footer + '")'
            }
        }
        return {};
    }
}]);