define(['app/application'], function(application) {
  'use strict';

  application.requires.push('modules.mindPlus.portals');

  return angular.module('modules.mindPlus.portals', ['ui.router']).config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider.state('mindPlus', {
        url: '/',
        templateUrl: '/SeedModules.MindPlus/ui/portals/views/index.html',
        requires: [
          'SeedModules.AngularUI/ui/requires',
          'SeedModules.MindPlus/ui/portals/requires'
        ]
      });
    }
  ]);
});
