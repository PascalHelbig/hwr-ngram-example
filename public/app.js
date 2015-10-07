var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', '$http', function ($scope, $mdSidenav, $http) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.getMatches = function (searchText) {
        return $http.post('/prediction', {searchText: searchText}).then(function (data) {
            console.log(data.data);
            return data.data;
        }, function () {
            return [];
        });
    }

}]);