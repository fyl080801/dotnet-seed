define([
    'app/application'
], function (application) {
    'use strict';

    application.requires.push('modules.login');

    return angular
        .module('modules.login', [
            'ui.router'
        ])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/login');

                $stateProvider.state('login', {
                    url: '/login',
                    templateUrl: '/SeedModules.Admin/ui/login/views/login.html',
                    requires: ['SeedModules.AngularUI/ui/requires', 'SeedModules.Admin/ui/login/requires']
                });
            }
        ]);

});