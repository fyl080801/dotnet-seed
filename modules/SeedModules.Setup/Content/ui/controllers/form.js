define([
    'SeedModules.Setup/ui/module'
], function (module) {
    'use strict';

    module.controller('SeedModules.Setup/ui/controllers/form', [
        '$scope',
        '$modal',
        'app.services.popupService',
        'app.services.httpService',
        function ($scope, $modal, popupService, httpService) {
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

            this.selectProject = function (elmId) {
                $('#' + elmId).trigger('click');
            };

            $scope.projectChanged = function (elmId) {
                $modal
                    .open({
                        template: 'aaa'
                    }).result
                    .then(function (data) {

                    });
            };

            $scope.mysql = {};

            $scope.mssql = {};

            $scope.data = {
                Name: 'seeddefault',
                TablePrefix: 'seeddefault',
                UserName: 'admin',
                Email: 'fyl080801@hotmail.com',
                Password: '123',
                PasswordConfirmation: '123'
            };

            $scope.initMsSql = function () {
                $scope.mssql.Server = '.';
                $scope.mssql.Username = 'sa';
                $scope.mssql.Database = 'seeddb';
                $scope.mssql.Password = 'qazwsxedc';
            };

            $scope.install = function () {
                switch (data.DatabaseProvider) {
                    case 'SqlConnection':
                        $scope.data.ConnectionString = 'Data Source=' + $scope.mssql.Server + ';Initial Catalog=' + $scope.mssql.Database + ';User ID=' + $scope.mssql.Username + ';Password=' + $scope.mssql.Password + ';';
                        break;
                    case 'MySql':
                        $scope.data.ConnectionString = $scope.mysql.ConnectionString;
                        break;
                    default:
                        $scope.data.ConnectionString = '';
                        break;
                }

                httpService
                    .post('/api/setup', $scope.data)
                    .then(function (result) {
                        popupService.information(result);
                    });
            };
        }
    ]);
});