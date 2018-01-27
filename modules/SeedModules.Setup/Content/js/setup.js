define('seedmodules/setup', [
    'app/application'
], function (application) {
    'use strict';

    application.requires.push('seedmodules.setup');

    return angular
        .module('seedmodules.setup', [])
        .controller('seedmodules.setup', [
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