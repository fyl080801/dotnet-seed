import angular = require('angular');

class Config {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: app.configs.IRequireStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $urlRouterProvider.otherwise('/setup');

    $stateProvider.state('setup', {
      url: '/setup',
      templateUrl: 'SeedModules.Setup/modules/views/form.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Setup/modules/requires'
      ]
    });
  }
}

export = angular.module('modules.setup', ['ui.router']).config(Config);
