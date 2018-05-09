define(['app/application'], function(application) {
  'use strict';

  application.requires.push('modules.login');

  return angular.module('modules.login', ['ui.router']).config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
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
  ]);
});
