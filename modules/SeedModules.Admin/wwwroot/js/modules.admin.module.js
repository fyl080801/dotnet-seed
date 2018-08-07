define('SeedModules.Admin/modules/admin/boot', [
    'require',
    'exports',
    'angular',
    'app/application',
    'angular-ui-router',
    'schema-form-bootstrap'
], function (require, exports, angular) {
    'use strict';
    var instance = angular.module('modules.admin.boot', [
        'ui.router',
        'schemaForm'
    ]);
    return instance;
});
define('SeedModules.Admin/modules/admin/configs/nav', ['SeedModules.Admin/modules/admin/boot'], function (configs) {
    'use strict';
    configs.provider('SeedModules.Admin/modules/admin/configs/nav', [function () {
            var me = this;
            var defaultOrder = 65535;
            var navData = [];
            this.add = function (nav) {
                nav.order = nav.order ? nav.order : defaultOrder;
                navData.push(nav);
            };
            this.$get = function () {
                return {
                    add: me.add,
                    tree: function () {
                        navData.sort(orderBy('order'));
                        return navData;
                    }
                };
            };
            function orderBy(name) {
                if (!name)
                    return function () {
                        return -1;
                    };
                return function (o, p) {
                    var a, b;
                    if (typeof o === 'object' && typeof p === 'object' && o && p) {
                        a = o[name];
                        b = p[name];
                        if (a === b) {
                            return 0;
                        }
                        if (typeof a === typeof b) {
                            return a < b ? -1 : 1;
                        }
                        return typeof a < typeof b ? -1 : 1;
                    } else {
                        throw '菜单排序异常';
                    }
                };
            }
        }]);
});
define('SeedModules.Admin/modules/admin/configs/menus', ['SeedModules.Admin/modules/admin/boot'], function (configs) {
    'use strict';
    configs.run([
        '$state',
        'SeedModules.Admin/modules/admin/configs/nav',
        function ($state, nav) {
            nav.add({
                text: '系统管理',
                icon: 'fas fa-cog fa-fw',
                order: -1,
                children: [
                    {
                        text: '用户管理',
                        itemClicked: function (evt) {
                            $state.go('admin.users');
                        }
                    },
                    {
                        text: '角色管理',
                        itemClicked: function (evt) {
                            $state.go('admin.roles');
                        }
                    },
                    {
                        text: '设置',
                        itemClicked: function (evt) {
                            $state.go('admin.settings');
                        }
                    }
                ]
            });
        }
    ]);
});
define('SeedModules.Admin/modules/admin/configs/router', ['SeedModules.Admin/modules/admin/boot'], function (configs) {
    'use strict';
    configs.run([
        '$rootScope',
        '$state',
        '$appEnvironment',
        function ($rootScope, $state, $appEnvironment) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            });
        }
    ]);
});
define('SeedModules.Admin/modules/admin/configs/environment', ['SeedModules.Admin/modules/admin/boot'], function (configs) {
    'use strict';
    configs.config([
        '$provide',
        function ($provide) {
            var permissions = function (data) {
                return new Function('return ' + data + ';')();
            }($('#app').attr('permissions'));
            $provide.constant('$permissions', permissions);
        }
    ]);
});
define('SeedModules.Admin/modules/admin/module', [
    'require',
    'exports',
    'angular',
    'SeedModules.Admin/modules/admin/configs/nav',
    'SeedModules.Admin/modules/admin/configs/menus',
    'SeedModules.Admin/modules/admin/configs/router',
    'SeedModules.Admin/modules/admin/configs/environment'
], function (require, exports, angular) {
    'use strict';
    var AdminModule = function () {
        function AdminModule($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/admin/dashboard');
            $stateProvider.state('admin', {
                url: '/admin',
                templateUrl: '/SeedModules.Admin/modules/admin/views/admin.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Admin/modules/admin/requires'
                ]
            });
            $stateProvider.state('admin.dashboard', {
                url: '/dashboard',
                templateUrl: '/SeedModules.Admin/modules/admin/views/dashboard.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Admin/modules/admin/requires'
                ]
            });
            $stateProvider.state('admin.users', {
                url: '/users',
                title: '用户管理',
                templateUrl: '/SeedModules.Admin/modules/admin/views/users.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Admin/modules/admin/requires'
                ]
            });
            $stateProvider.state('admin.roles', {
                url: '/roles',
                title: '角色管理',
                templateUrl: '/SeedModules.Admin/modules/admin/views/roles.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Admin/modules/admin/requires'
                ]
            });
            $stateProvider.state('admin.settings', {
                url: '/settings',
                title: '设置',
                templateUrl: '/SeedModules.Admin/modules/admin/views/settings.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Admin/modules/admin/requires'
                ]
            });
        }
        AdminModule.$inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        return AdminModule;
    }();
    return angular.module('modules.admin', ['modules.admin.boot']).config(AdminModule);
});