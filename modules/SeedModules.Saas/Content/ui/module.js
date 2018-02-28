define(['app/application', 'SeedModules.Saas/ui/configs/menus'], function(
  application
) {
  'use strict';

  application.requires.push('modules.saas');

  return angular
    .module('modules.saas', ['ui.router', 'modules.saas.configs'])
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('admin.datasources', {
          url: '/datasources',
          title: '数据源',
          templateUrl: '/SeedModules.Saas/ui/views/datasources.html',
          requires: [
            'SeedModules.AngularUI/ui/requires',
            'SeedModules.Saas/ui/requires'
          ]
        });

        $stateProvider.state('admin.projects', {
          url: '/projects',
          title: '模板管理',
          templateUrl: '/SeedModules.Saas/ui/views/projects.html',
          requires: [
            'SeedModules.AngularUI/ui/requires',
            'SeedModules.Saas/ui/requires'
          ]
        });

        $stateProvider.state('admin.tenants', {
          url: '/tenants',
          title: '租户管理',
          templateUrl: '/SeedModules.Saas/ui/views/tenants.html',
          requires: [
            'SeedModules.AngularUI/ui/requires',
            'SeedModules.Saas/ui/requires'
          ]
        });
      }
    ]);
});
