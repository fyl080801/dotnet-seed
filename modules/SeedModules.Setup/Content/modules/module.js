define(['app/application', 'SeedModules.AngularUI/modules/module'], function (application) {
    'use strict';
    application.requires.push('modules.setup');
    return angular.module('modules.setup', ['ui.router']).config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/setup');
            $stateProvider.state('setup', {
                url: '/setup',
                templateUrl: 'SeedModules.Setup/modules/views/form.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Setup/modules/requires'
                ]
            });
        }
    ]);
});
