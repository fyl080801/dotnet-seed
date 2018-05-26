import angular = require('angular');
import 'app/application';
import 'angular-ui-router';

class ModuleClass {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: app.configs.IRequireStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
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
}

export = angular.module('modules.login', ['ui.router']).config(ModuleClass);
