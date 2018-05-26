define(["require", "exports", "angular", "app/application", "SeedModules.Admin/modules/admin/configs/nav", "SeedModules.Admin/modules/admin/configs/menus", "SeedModules.Admin/modules/admin/configs/router", "SeedModules.Admin/modules/admin/configs/environment"], function (require, exports, angular) {
    "use strict";
    var AdminModule = /** @class */ (function () {
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
        AdminModule.$inject = ['$stateProvider', '$urlRouterProvider'];
        return AdminModule;
    }());
    return angular
        .module('modules.admin', ['modules.admin.boot'])
        .config(AdminModule);
});
//# sourceMappingURL=module.js.map