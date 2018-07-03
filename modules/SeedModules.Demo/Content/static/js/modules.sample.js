define('modules/sample/module', [
    'require',
    'exports',
    'angular'
], function (require, exports, angular) {
    'use strict';
    var SampleModule = function () {
        function SampleModule($stateProvider, $urlRouterProvider) {
            $stateProvider.state('index', {
                url: '/index',
                templateUrl: 'modules/sample/views/index.html'
            });
            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'modules/sample/components/home.html',
                requires: ['modules/sample/requires']
            });
            $stateProvider.state('jexcel', {
                url: '/jexcel',
                templateUrl: 'modules/sample/components/jexcel.html',
                requires: ['modules/sample/requires']
            });
            $urlRouterProvider.otherwise('/index');
        }
        SampleModule.$inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        return SampleModule;
    }();
    return angular.module('modules.sample', []).config(SampleModule);
});