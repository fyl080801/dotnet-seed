define(['app/application'], function(application) {
  'use strict';

  application.requires.push('modules.mindPlus.myworks');

  return angular.module('modules.mindPlus.myworks', ['ui.router']).config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/mymind/works');

      $stateProvider.state('mymind', {
        url: '/mymind',
        templateUrl: '/SeedModules.MindPlus/ui/myworks/views/mymind.html',
        requires: [
          'SeedModules.AngularUI/ui/requires',
          'SeedModules.MindPlus/ui/myworks/requires'
        ]
      });

      $stateProvider.state('mymind.works', {
        url: '/works',
        templateUrl: '/SeedModules.MindPlus/ui/myworks/views/works.html',
        requires: [
          'SeedModules.AngularUI/ui/requires',
          'SeedModules.MindPlus/ui/myworks/requires'
        ]
      });

      $stateProvider.state('mymind.trash', {
        url: '/trash',
        templateUrl: '/SeedModules.MindPlus/ui/myworks/views/trash.html',
        requires: [
          'SeedModules.AngularUI/ui/requires',
          'SeedModules.MindPlus/ui/myworks/requires'
        ]
      });
    }
  ]);
});
