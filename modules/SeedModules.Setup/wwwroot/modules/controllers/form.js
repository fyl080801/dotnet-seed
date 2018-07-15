define(["require", "exports", "SeedModules.Setup/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope, $modal, $location, $window, popupService, requestService) {
            this.$scope = $scope;
            this.$modal = $modal;
            this.$location = $location;
            this.$window = $window;
            this.popupService = popupService;
            this.requestService = requestService;
            $scope.me = this;
            $scope.setupForm = {
                url: '/api/setup'
            };
            $scope.projectFile = {};
            $scope.mysql = {};
            $scope.mssql = {};
            $scope.sqlite = {};
            $scope.data = {
                Name: 'seed',
                TablePrefix: 'seed',
                UserName: 'admin',
                Email: 'fyl080801@hotmail.com',
                Password: '!QAZ2wsx',
                PasswordConfirmation: '!QAZ2wsx'
            };
            $scope.databaseProviders = [
                {
                    Provider: 'SqlConnection',
                    Name: 'Microsoft SQLServer'
                },
                {
                    Provider: 'MySql',
                    Name: 'MySql Database'
                }
            ];
            requestService
                .url('/api/setup')
                .get()
                .result.then(function (result) {
                $scope.data.Name = result.name ? result.name : $scope.data.Name;
                $scope.data.TablePrefix = result.tablePrefix
                    ? result.tablePrefix
                    : $scope.data.TablePrefix;
                $scope.data.TenantCreated = result.tenantCreated;
            });
        }
        Controller.prototype.selectProject = function () {
            this.$scope.projectFile.open();
        };
        Controller.prototype.initMsSql = function () {
            this.$scope.mssql.Server = '.';
            this.$scope.mssql.Username = 'sa';
            this.$scope.mssql.Database = 'seeddb';
            this.$scope.mssql.Password = 'qazwsxedc';
        };
        Controller.prototype.initMySql = function () {
            this.$scope.mysql.Server = 'localhost';
            this.$scope.mysql.Username = 'root';
            this.$scope.mysql.Database = 'seeddb';
            this.$scope.mysql.Password = '!QAZ2wsx';
            this.$scope.mysql.Port = 3306;
        };
        Controller.prototype.install = function () {
            var _this = this;
            switch (this.$scope.data.DatabaseProvider) {
                case 'SqlConnection':
                    this.$scope.data.ConnectionString =
                        'Data Source=' +
                            this.$scope.mssql.Server +
                            ';Initial Catalog=' +
                            this.$scope.mssql.Database +
                            ';User ID=' +
                            this.$scope.mssql.Username +
                            ';Password=' +
                            this.$scope.mssql.Password +
                            ';';
                    break;
                case 'MySql': {
                    this.$scope.data.ConnectionString =
                        'server=' +
                            this.$scope.mysql.Server +
                            ';database=' +
                            this.$scope.mysql.Database +
                            ';uid=' +
                            this.$scope.mysql.Username +
                            ';pwd=' +
                            this.$scope.mysql.Password +
                            ';';
                    if (this.$scope.mysql.Port && this.$scope.mysql.Port !== '') {
                        this.$scope.data.ConnectionString =
                            this.$scope.data.ConnectionString +
                                'port=' +
                                this.$scope.mysql.Port +
                                ';';
                    }
                    if (!this.$scope.mysql.Ssl) {
                        this.$scope.data.ConnectionString =
                            this.$scope.data.ConnectionString + 'SslMode=none;';
                    }
                    break;
                }
                default:
                    this.$scope.data.ConnectionString = '';
                    break;
            }
            this.$scope.setupForm
                .submit({
                data: {
                    DatabaseProvider: this.$scope.data.DatabaseProvider,
                    ConnectionString: this.$scope.data.ConnectionString
                }
            })
                .then(function (result) {
                _this.$location.url('/');
                _this.$window.location.reload();
            });
        };
        Controller.$inject = [
            '$scope',
            '$modal',
            '$location',
            '$window',
            'app/services/popupService',
            'SeedModules.AngularUI/modules/services/requestService'
        ];
        return Controller;
    }());
    mod.controller('SeedModules.Setup/modules/controllers/form', Controller);
});
//# sourceMappingURL=form.js.map