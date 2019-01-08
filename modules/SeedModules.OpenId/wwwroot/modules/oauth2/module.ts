import angular = require('angular');
import 'app/application';

class Config {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: app.configs.IRequireStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('index', {
      url: '/',
      templateUrl: '/SeedModules.OpenId/modules/oauth2/views/index.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.OpenId/modules/oauth2/requires'
      ]
    });
  }
}

export = angular.module('modules.oauth2', ['ui.router']).config(Config);
