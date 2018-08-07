define('SeedModules.Setup/modules/module', [
    'require',
    'exports',
    'angular',
    'app/application'
], function (require, exports, angular) {
    'use strict';
    var Config = function () {
        function Config($stateProvider, $urlRouterProvider) {
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
        Config.$inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        return Config;
    }();
    return angular.module('modules.setup', ['ui.router']).config(Config);
});