define('SeedModules.Saas/modules/configs', [
    'require',
    'exports',
    'angular',
    'app/application'
], function (require, exports, angular) {
    'use strict';
    return angular.module('modules.saas.configs', []);
});
define('SeedModules.Saas/modules/configs/menus', [
    'require',
    'exports',
    'SeedModules.Saas/modules/configs'
], function (require, exports, configs) {
    'use strict';
    exports.__esModule = true;
    var MenusRunClass = function () {
        function MenusRunClass($state, nav) {
            nav.add({
                text: '托管平台',
                icon: 'fas fa-server fa-fw',
                children: [
                    {
                        text: '数据库管理',
                        itemClicked: function (evt) {
                            $state.go('admin.datasources');
                        }
                    },
                    {
                        text: '租户管理',
                        itemClicked: function (evt) {
                            $state.go('admin.tenants');
                        }
                    }
                ]
            });
        }
        MenusRunClass.$inject = [
            '$state',
            'SeedModules.Admin/modules/admin/configs/nav'
        ];
        return MenusRunClass;
    }();
    configs.run(MenusRunClass);
});
define('SeedModules.Saas/modules/module', [
    'require',
    'exports',
    'angular',
    'SeedModules.Saas/modules/configs/menus'
], function (require, exports, angular) {
    'use strict';
    var ConfigClass = function () {
        function ConfigClass($stateProvider, $urlRouterProvider) {
            $stateProvider.state('admin.datasources', {
                url: '/datasources',
                title: '数据源',
                templateUrl: '/SeedModules.Saas/modules/views/datasources.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Saas/modules/requires'
                ]
            });
            $stateProvider.state('admin.projects', {
                url: '/projects',
                title: '模板管理',
                templateUrl: '/SeedModules.Saas/modules/views/projects.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Saas/modules/requires'
                ]
            });
            $stateProvider.state('admin.tenants', {
                url: '/tenants',
                title: '租户管理',
                templateUrl: '/SeedModules.Saas/modules/views/tenants.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Saas/modules/requires'
                ]
            });
        }
        ConfigClass.$inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        return ConfigClass;
    }();
    return angular.module('modules.saas', [
        'ui.router',
        'modules.saas.configs'
    ]).config(ConfigClass);
});