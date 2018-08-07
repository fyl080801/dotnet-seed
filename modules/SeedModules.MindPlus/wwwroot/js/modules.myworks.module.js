define('SeedModules.MindPlus/modules/myworks/module', [
    'require',
    'exports',
    'angular',
    'app/application'
], function (require, exports, angular) {
    'use strict';
    var ConfigClass = function () {
        function ConfigClass($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home/dashboard');
            $stateProvider.state('home', {
                url: '/home',
                title: 'Mind+',
                templateUrl: '/SeedModules.MindPlus/modules/myworks/views/home.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.dashboard', {
                url: '/dashboard',
                title: 'Mind+',
                templateUrl: '/SeedModules.MindPlus/modules/myworks/views/dashboard.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.works', {
                url: '/works/{parentid}',
                templateUrl: '/SeedModules.MindPlus/modules/myworks/components/work/worklist.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work', {
                url: '/work/{id}',
                templateUrl: '/SeedModules.MindPlus/modules/myworks/components/work/work.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work.dashboard', {
                url: '/dashboard',
                templateUrl: '/SeedModules.MindPlus/modules/myworks/components/work/dashboard.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work.workitems', {
                url: '/workitems',
                templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/master.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work.workitems.board', {
                url: '/board',
                views: {
                    toolbar: { templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/boardToolbar.html' },
                    content: { templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/board.html' }
                },
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work.workitems.mind', {
                url: '/mind',
                views: {
                    toolbar: { templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/mindToolbar.html' },
                    content: { templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/mind.html' }
                },
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work.workitems.document', {
                url: '/document',
                views: {
                    toolbar: { templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/documentToolbar.html' },
                    content: { templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/document.html' }
                },
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work.workitems.gantt', {
                url: '/gantt',
                views: {
                    toolbar: { templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/ganttToolbar.html' },
                    content: { templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/gantt.html' }
                },
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.trash', {
                url: '/trash',
                templateUrl: '/SeedModules.MindPlus/modules/myworks/views/trash.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
        }
        ConfigClass.$inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        return ConfigClass;
    }();
    return angular.module('modules.mindPlus.myworks', ['ui.router']).config(ConfigClass);
});