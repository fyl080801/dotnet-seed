define(['app/application'], function (application) {
    'use strict';
    application.requires.push('modules.mindPlus.myworks');
    return angular.module('modules.mindPlus.myworks', ['ui.router']).config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
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
                    toolbar: {
                        templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/boardToolbar.html'
                    },
                    content: {
                        templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/board.html'
                    }
                },
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work.workitems.mind', {
                url: '/mind',
                views: {
                    toolbar: {
                        templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/mindToolbar.html'
                    },
                    content: {
                        templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/mind.html'
                    }
                },
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work.workitems.document', {
                url: '/document',
                views: {
                    toolbar: {
                        templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/documentToolbar.html'
                    },
                    content: {
                        templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/document.html'
                    }
                },
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/myworks/requires'
                ]
            });
            $stateProvider.state('home.work.workitems.gantt', {
                url: '/gantt',
                views: {
                    toolbar: {
                        templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/ganttToolbar.html'
                    },
                    content: {
                        templateUrl: '/SeedModules.MindPlus/modules/myworks/components/workitem/gantt.html'
                    }
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
    ]);
});
//# sourceMappingURL=module.js.map