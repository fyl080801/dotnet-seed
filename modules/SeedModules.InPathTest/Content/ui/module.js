define(['app/application'], function(application) {
  'use strict';

  application.requires.push('modules.fakelogin');

  return angular.module('modules.fakelogin', ['ui.router']).config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/login');

      $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/SeedModules.InPathTest/modules/views/login.html',
        requires: [
          'SeedModules.AngularUI/modules/requires',
          'SeedModules.InPathTest/modules/requires'
        ]
      });
    }
  ]);
});
