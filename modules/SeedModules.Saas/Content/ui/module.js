define([
    'app/application',
    'SeedModules.Saas/ui/configs/menus'
], function (application) {
    'use strict';

    application.requires.push('modules.saas');

    return angular
        .module('modules.saas', [
            'ui.router',
            'modules.saas.configs'
        ])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.state('admin.tenants', {
                    url: '/tenants',
                    templateUrl: '/SeedModules.Saas/ui/views/tenants.html',
                    requires: ['SeedModules.AngularUI/ui/requires', 'SeedModules.Saas/ui/requires']
                });
            }
        ]);
});