define([
    'SeedModules.Saas/ui/module'
], function (module) {
    'use strict';

    module.controller('SeedModules.Saas/ui/controllers/tenants', [
        '$scope',
        '$modal',
        'SeedModules.AngularUI/ui/services/requestService',
        function ($scope, $modal, requestService) {
            $scope.list = [];
            $scope.total = 0;

            $scope.create = function () {
                $modal
                    .open({
                        templateUrl: '/SeedModules.Saas/ui/views/tenantForm.html'
                    }).result
                    .then(function (data) {
                        requestService
                            .url('/api/tenant/info')
                            .post(data)
                            .then(function (result) {

                            });
                    });
            };

            $scope.load = function () {
                requestService
                    .url('/api/tenant?page=' + 1 + '&count=' + 10)
                    .post({
                        keyword: ''
                    })
                    .then(function (result) {
                        $scope.list = result.list;
                    });
            };
        }
    ]);
});