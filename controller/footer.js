app.controller("footerController", ['$scope', '$http', '$window', function ($scope) {
    $scope.getData({ collection: 'setting', doc: 'footer' }, function (value) {
        $scope.image = {
            'background-image': 'url("' + value.data.src.getUrlImage() + '")'
        }
        $scope.text = value.data.text
    });
}]);