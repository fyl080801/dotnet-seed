define('SeedModules.MindPlus/modules/login/module', [
    'require',
    'exports',
    'angular',
    'app/application'
], function (require, exports, angular) {
    'use strict';
    var Config = function () {
        function Config($stateProvider, $urlRouterProvider) {
            $stateProvider.state('mindlogin', {
                url: '/',
                title: '登录',
                templateUrl: '/SeedModules.MindPlus/modules/login/views/login.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/login/requires'
                ]
            });
            $urlRouterProvider.otherwise('/');
        }
        Config.$inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        return Config;
    }();
    return angular.module('modules.mindPlus.login', ['ui.router']).config(Config);
});