import angular = require('angular');
import 'app/application';
import 'angular-ui-router';
import 'schema-form-bootstrap';

class ConfigClass {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: app.configs.IRequireStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('mindPlus', {
      url: '/',
      templateUrl: '/SeedModules.MindPlus/modules/portals/views/index.html',
      requires: ['SeedModules.MindPlus/modules/portals/requires']
    });

    $stateProvider.state('mindRegister', {
      url: '/register',
      templateUrl: '/SeedModules.MindPlus/modules/portals/views/register.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.MindPlus/modules/portals/requires'
      ]
    });

    $stateProvider.state('mindLogin', {
      url: '/mdlogin',
      templateUrl: '/SeedModules.MindPlus/modules/portals/views/login.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.MindPlus/modules/portals/requires'
      ]
    });
  }
}

export = angular
  .module('modules.mindPlus.portals', ['ui.router', 'schemaForm'])
  .config(ConfigClass);
