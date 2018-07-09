import angular = require('angular');
import 'SeedModules.Saas/modules/configs/menus';

class ConfigClass {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor($stateProvider, $urlRouterProvider) {
    $stateProvider.state('admin.datasources', {
      url: '/datasources',
      title: '数据源',
      templateUrl: '/SeedModules.Saas/modules/views/datasources.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Saas/modules/requires'
      ]
    });

    $stateProvider.state('admin.projects', {
      url: '/projects',
      title: '模板管理',
      templateUrl: '/SeedModules.Saas/modules/views/projects.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Saas/modules/requires'
      ]
    });

    $stateProvider.state('admin.tenants', {
      url: '/tenants',
      title: '租户管理',
      templateUrl: '/SeedModules.Saas/modules/views/tenants.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Saas/modules/requires'
      ]
    });
  }
}

export = angular
  .module('modules.saas', ['ui.router', 'modules.saas.configs'])
  .config(ConfigClass);
