define([
    'SeedModules.Setup/ui/module'
], function (module) {
    'use strict';

    module.controller('SeedModules.Setup/ui/controllers/form', [
        '$scope',
        'app.services.popupService',
        'app.services.httpService',
        function ($scope, popupService, httpService) {
            this.purposes = [{
                Id: '1',
                Name: '管理系统'
            }];

            this.databaseProviders = [{
                Provider: 'SqlConnection',
                Name: 'Microsoft SQLServer'
            }, {
                Provider: 'MySql',
                Name: 'MySql Database'
            }];

            $scope.mssql = {};

            $scope.data = {};

            $scope.initMsSql = function () {
                $scope.mssql.Server = '.';
                $scope.mssql.Username = 'sa';
            };

            $scope.install = function () {
                httpService
                    .post('/api/setup', $scope.data)
                    .then(function (result) {
                        popupService.information(result);
                    });
            };
        }
    ]);
});