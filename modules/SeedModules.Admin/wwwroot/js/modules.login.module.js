define('SeedModules.Admin/modules/login/module', [
    'require',
    'exports',
    'angular',
    'app/application',
    'angular-ui-router'
], function (require, exports, angular) {
    'use strict';
    var ModuleClass = function () {
        function ModuleClass($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: '/SeedModules.Admin/modules/login/views/login.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Admin/modules/login/requires'
                ]
            });
        }
        ModuleClass.$inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        return ModuleClass;
    }();
    return angular.module('modules.login', ['ui.router']).config(ModuleClass);
});