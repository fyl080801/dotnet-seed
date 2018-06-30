define(["require", "exports", "angular", "app/application", "SeedModules.Saas/modules/configs/menus"], function (require, exports, angular) {
    "use strict";
    var ConfigClass = (function () {
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
        ConfigClass.$inject = ['$stateProvider', '$urlRouterProvider'];
        return ConfigClass;
    }());
    return angular
        .module('modules.saas', ['ui.router', 'modules.saas.configs'])
        .config(ConfigClass);
});
