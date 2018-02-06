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
            $scope.setupForm = {
                url: '/api/setup'
            };

            $scope.projectFile = {

            };

            $scope.mysql = {};

            $scope.mssql = {};

            $scope.data = {
                Name: 'seed',
                TablePrefix: 'seed',
                UserName: 'admin',
                Email: 'fyl080801@hotmail.com',
                Password: '123',
                PasswordConfirmation: '123'
            };

            // $scope.projectChanged = function () {
            //     $scope.fileForm
            //         .submit()
            //         .then(function (result) {
            //             $scope.projectFile.clear();
            //         }, function (result) {
            //             $scope.projectFile.clear();
            //         });
            // };

            $scope.initMsSql = function () {
                $scope.mssql.Server = '.';
                $scope.mssql.Username = 'sa';
                $scope.mssql.Database = 'seeddb';
                $scope.mssql.Password = 'qazwsxedc';
            };

            $scope.install = function () {
                switch ($scope.data.DatabaseProvider) {
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

                $scope.setupForm
                    .submit({
                        data: {
                            DatabaseProvider: $scope.data.DatabaseProvider,
                            ConnectionString: $scope.data.ConnectionString
                        }
                    })
                    .then(function (result) {

                    });
            };

            this.selectProject = function () {
                $scope.projectFile.open();
            };

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
        }
    ]);
});