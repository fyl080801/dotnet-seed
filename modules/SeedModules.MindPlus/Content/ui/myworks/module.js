define(['app/application'], function(application) {
  'use strict';

  application.requires.push('modules.mindPlus.myworks');

  return angular.module('modules.mindPlus.myworks', ['ui.router']).config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider.state('mindPlus', {
        url: '/',
        templateUrl: '/SeedModules.MindPlus/ui/myworks/views/mymind.html',
        requires: [
          'SeedModules.AngularUI/ui/requires',
          'SeedModules.MindPlus/ui/myworks/requires'
        ]
      });
    }
  ]);
});
