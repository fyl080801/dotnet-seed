define([
    'app/application',
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
                $urlRouterProvider.otherwise('/admin');

                $stateProvider.state('admin', {
                    url: '/admin',
                    templateUrl: 'SeedModules.Admin/ui/views/admin.html',
                    requires: ['SeedModules.AngularUI/ui/requires', 'SeedModules.Admin/ui/requires']
                });
            }
        ]);

});