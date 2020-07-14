app.controller("floatMenuController", ['$scope', function ($scope) {
    $scope.loadComplete = function () {
        new Floaty('#floatyMenu');
        $('#modalMenu').on('show.bs.modal', function () {
            $('.button-floaty').addClass('active');
            if ($('#modalMenu').hasScrollBar()) {
                new SimpleBar(document.querySelector('#modalMenu'), { autoHide: false });
            }
        });
        $('#modalMenu').on('hide.bs.modal', function () {
            $('.button-floaty').removeClass('active');
        });
    }

    $scope.getData({ collection: 'menu' }, function (value) {
        $scope.dataArrayMenu = value.data.sort((a, b) => { return a.index - b.index });
    });

    $scope.closeFloatyMenu = function () {
        $('#modalMenu').modal('hide');
    }

    $scope.activeMenu = function (item) {
        const url = window.location.href.replace(location.origin, '').toLowerCase();
        if (url == item.toLowerCase()) {
            return 'btn-outline-dark';
        }
        return 'btn-outline-danger';
    }
}]);