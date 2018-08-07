define('SeedModules.Saas/modules/controllers/tenants', ['SeedModules.Saas/modules/module'], function (module) {
    'use strict';
    module.controller('SeedModules.Saas/modules/controllers/tenants', [
        '$scope',
        '$modal',
        'app/services/popupService',
        'SeedModules.AngularUI/modules/factories/ngTableRequest',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, $modal, popupService, ngTableRequest, requestService, schemaFormParams) {
            $scope.search = { keyword: '' };
            $scope.tableParams = new ngTableRequest({
                url: '/api/tenant',
                showLoading: false,
                data: $scope.search
            }).ngTableParams();
            $scope.formParams = new schemaFormParams().properties({
                name: {
                    title: '名称',
                    type: 'string',
                    required: true
                },
                requestUrlPrefix: {
                    title: 'Url前缀',
                    type: 'string'
                },
                requestUrlHost: {
                    title: '主机',
                    type: 'string'
                },
                databaseProvider: {
                    title: '数据库类型',
                    type: 'string',
                    required: true
                },
                tablePrefix: {
                    title: '表前缀',
                    type: 'string',
                    required: true
                },
                mysql_Server: {
                    title: '服务地址',
                    type: 'string',
                    required: true
                },
                mysql_Database: {
                    title: '数据库名称',
                    type: 'string',
                    required: true
                },
                mysql_Username: {
                    title: '用户名',
                    type: 'string',
                    required: true
                },
                mysql_Password: {
                    title: '密码',
                    type: 'string',
                    required: true
                },
                mysql_Port: {
                    title: '端口号',
                    type: 'string'
                },
                mysql_Ssl: {
                    title: 'SSL',
                    type: 'boolean'
                },
                mssql_Server: {
                    title: '服务地址',
                    type: 'string',
                    required: true
                },
                mssql_Database: {
                    title: '数据库名称',
                    type: 'string',
                    required: true
                },
                mssql_Username: {
                    title: '用户名',
                    type: 'string',
                    required: true
                },
                mssql_Password: {
                    title: '密码',
                    type: 'string',
                    required: true
                }
            });
            $scope.form = [
                'name',
                {
                    type: 'section',
                    htmlClass: 'row',
                    items: [
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['requestUrlPrefix']
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['requestUrlHost']
                        }
                    ]
                },
                {
                    type: 'section',
                    htmlClass: 'row',
                    items: [
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: [{
                                    key: 'databaseProvider',
                                    type: 'select',
                                    titleMap: [
                                        {
                                            value: 'SqlConnection',
                                            name: 'Microsoft SQLServer'
                                        },
                                        {
                                            value: 'MySql',
                                            name: 'MySql Database'
                                        }
                                    ]
                                }]
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['tablePrefix']
                        }
                    ]
                },
                {
                    type: 'section',
                    htmlClass: 'row',
                    condition: 'model.databaseProvider===\'MySql\'',
                    items: [
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['mysql_Server']
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['mysql_Database']
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['mysql_Username']
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: [{
                                    key: 'mysql_Password',
                                    type: 'password'
                                }]
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['mysql_Port']
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: [{
                                    key: 'mysql_Ssl',
                                    type: 'switch',
                                    trueText: '开',
                                    falseText: '关'
                                }]
                        }
                    ]
                },
                {
                    type: 'section',
                    htmlClass: 'row',
                    condition: 'model.databaseProvider===\'SqlConnection\'',
                    items: [
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['mssql_Server']
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['mssql_Database']
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: ['mssql_Username']
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: [{
                                    key: 'mssql_Password',
                                    type: 'password'
                                }]
                        }
                    ]
                }
            ];
            $scope.checkedAll = false;
            $scope.checked = {};
            $scope.checkAll = function () {
                $scope.checkedAll = !$scope.checkedAll;
                if ($scope.checkedAll) {
                    $.each($scope.tableParams.data, function (idx, item) {
                        $scope.checked[item.name] = true;
                    });
                } else {
                    $.each($scope.tableParams.data, function (idx, item) {
                        $scope.checked[item.name] = false;
                    });
                }
            };
            $scope.onCheck = function () {
                $scope.checkedAll = true;
                $.each($scope.tableParams.data, function (idx, item) {
                    if (!$scope.checked[item.name]) {
                        $scope.checkedAll = false;
                        return false;
                    }
                });
            };
            $scope.create = function () {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    data: {
                        title: '租户信息',
                        formParams: $scope.formParams,
                        form: $scope.form,
                        model: {}
                    }
                }).result.then(function (data) {
                    switch (data.databaseProvider) {
                    case 'SqlConnection':
                        data.connectionString = 'Data Source=' + data.mssql_Server + ';Initial Catalog=' + data.mssql_Database + ';User ID=' + data.mssql_Username + ';Password=' + data.mssql_Password + ';';
                        break;
                    case 'MySql': {
                            data.connectionString = 'server=' + data.mysql_Server + ';database=' + data.mysql_Database + ';uid=' + data.mysql_Username + ';pwd=' + data.mysql_Password + ';';
                            if (data.mysql_Port && data.mysql_Port !== '') {
                                data.connectionString = data.connectionString + 'port=' + data.mysql_Port + ';';
                            }
                            if (!data.mysql_Ssl) {
                                data.connectionString = data.connectionString + 'SslMode=none;';
                            }
                            break;
                        }
                    default:
                        data.connectionString = '';
                        break;
                    }
                    requestService.url('/api/tenant/info').post(data).result.then(function (result) {
                        $scope.tableParams.reload();
                    });
                });
            };
            $scope.drop = function () {
                popupService.confirm('是否删除\uFF1F').ok(function () {
                });
            };
            $scope.keywordCallback = function () {
            };
        }
    ]);
});
define('SeedModules.Saas/modules/controllers/projects', ['SeedModules.Saas/modules/module'], function (module) {
    'use strict';
    module.controller('SeedModules.Saas/modules/controllers/projects', [
        '$scope',
        function ($scope) {
        }
    ]);
});
define('SeedModules.Saas/modules/controllers/datasources', ['SeedModules.Saas/modules/module'], function (module) {
    'use strict';
    module.controller('SeedModules.Saas/modules/controllers/datasources', [
        '$scope',
        function ($scope) {
        }
    ]);
});
define('SeedModules.Saas/modules/filters/tenantState', ['SeedModules.Saas/modules/module'], function (module) {
    'use strict';
    module.filter('tenantState', [function () {
            var map = [
                '未初始化',
                '初始化中',
                '运行中',
                '已禁用',
                '异常'
            ];
            return function (val) {
                return map[val];
            };
        }]);
});
define('SeedModules.Saas/modules/requires', [
    'require',
    'exports',
    'SeedModules.Saas/modules/controllers/tenants',
    'SeedModules.Saas/modules/controllers/projects',
    'SeedModules.Saas/modules/controllers/datasources',
    'SeedModules.Saas/modules/filters/tenantState'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
});