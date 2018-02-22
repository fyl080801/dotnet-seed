define([
    'SeedModules.Admin/ui/login/module'
], function (module) {
    'use strict';

    module.controller('SeedModules.Admin/ui/login/controllers/login', [
        '$scope',
        '$location',
        'SeedModules.AngularUI/ui/services/apiService',
        function ($scope, $location, apiService) {
            $scope.data = {};

            $scope.login = function () {
                var query = $location.search();
                apiService
                    .post('/api/account/login?ReturnUrl=/', $scope.data)
                    .success(function (result) {

                    })
                    .error(function (err) {

                    });
            };
        }
    ]);
});