define(['app/application'], function(application) {
  'use strict';

  application.requires.push('modules.mindPlus');

  return angular.module('modules.mindPlus', ['ui.router']).config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/mindPlus');

      $stateProvider.state('mindPlus', {
        url: '/mindPlus',
        templateUrl: '/SeedModules.MindPlus/ui/views/index.html',
        requires: [
          'SeedModules.AngularUI/ui/requires',
          'SeedModules.MindPlus/ui/requires'
        ]
      });
    }
  ]);
});
