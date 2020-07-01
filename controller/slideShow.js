app.controller("slideShowController", function ($scope, $http) {
    $scope.dataArray = [
        {
            "src": "https://www.travelexcellence.com/images/movil/La_Paz_Waterfall.jpg"
        },
        {
            "src": "http://www.parasholidays.in/blog/wp-content/uploads/2014/05/holiday-tour-packages-for-usa.jpg"
        }
    ];

    //  $http.get('./data/slideshow.json').then(value =>{
    //     $scope.dataArray = value.data;
    //  })
});