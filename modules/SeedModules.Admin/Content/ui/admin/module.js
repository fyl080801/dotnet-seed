define([
    'app/application'
], function (application) {
    'use strict';

    application.requires.push('modules.admin');

    return angular
        .module('modules.admin', [
            'ui.router'
        ])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/admin/dashboard');

                $stateProvider.state('admin', {
                    url: '/admin',
                    templateUrl: '/SeedModules.Admin/ui/admin/views/admin.html',
                    requires: ['SeedModules.AngularUI/ui/requires', 'SeedModules.Admin/ui/admin/requires']
                });

                $stateProvider.state('admin.dashboard', {
                    url: '/dashboard',
                    templateUrl: '/SeedModules.Admin/ui/admin/views/dashboard.html',
                    requires: ['SeedModules.AngularUI/ui/requires', 'SeedModules.Admin/ui/admin/requires']
                });

                $stateProvider.state('admin.users', {
                    url: '/users',
                    templateUrl: '/SeedModules.Admin/ui/admin/views/users.html',
                    requires: ['SeedModules.AngularUI/ui/requires', 'SeedModules.Admin/ui/admin/requires']
                });

                $stateProvider.state('admin.roles', {
                    url: '/roles',
                    templateUrl: '/SeedModules.Admin/ui/admin/views/roles.html',
                    requires: ['SeedModules.AngularUI/ui/requires', 'SeedModules.Admin/ui/admin/requires']
                });
            }
        ]);

});