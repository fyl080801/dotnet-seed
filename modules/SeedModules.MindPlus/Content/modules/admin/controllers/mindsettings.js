define(['SeedModules.MindPlus/modules/admin/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/admin/controllers/mindsettings', [
        '$scope',
        'SeedModules.AngularUI/modules/services/requestService',
        function ($scope, requestService) {
            $scope.settings = null;
            $scope.loadSettings = function () {
                requestService
                    .url('/api/mindplus/document/settings')
                    .options({ showLoading: false })
                    .get()
                    .result.then(function (result) {
                    $scope.settings = result;
                });
            };
            $scope.saveSettings = function () {
                requestService
                    .url('/api/mindplus/document/settings')
                    .put($scope.settings)
                    .result.then(function (result) { });
            };
        }
    ]);
});
