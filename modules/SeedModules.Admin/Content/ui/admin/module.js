define([
  'app/application',
  'schema-form-bootstrap',
  'SeedModules.Admin/ui/admin/configs/nav',
  'SeedModules.Admin/ui/admin/configs/menus',
  'SeedModules.Admin/ui/admin/configs/router'
], function(application) {
  'use strict';

  application.requires.push('modules.admin');

  return angular
    .module('modules.admin', [
      'ui.router',
      'schemaForm',
      'modules.admin.configs'
    ])
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/admin/dashboard');

        $stateProvider.state('admin', {
          url: '/admin',
          templateUrl: '/SeedModules.Admin/ui/admin/views/admin.html',
          requires: [
            'SeedModules.AngularUI/ui/requires',
            'SeedModules.Admin/ui/admin/requires'
          ]
        });

        $stateProvider.state('admin.dashboard', {
          url: '/dashboard',
          templateUrl: '/SeedModules.Admin/ui/admin/views/dashboard.html',
          requires: [
            'SeedModules.AngularUI/ui/requires',
            'SeedModules.Admin/ui/admin/requires'
          ]
        });

        $stateProvider.state('admin.users', {
          url: '/users',
          title: '用户管理',
          templateUrl: '/SeedModules.Admin/ui/admin/views/users.html',
          requires: [
            'SeedModules.AngularUI/ui/requires',
            'SeedModules.Admin/ui/admin/requires'
          ]
        });

        $stateProvider.state('admin.roles', {
          url: '/roles',
          title: '角色管理',
          templateUrl: '/SeedModules.Admin/ui/admin/views/roles.html',
          requires: [
            'SeedModules.AngularUI/ui/requires',
            'SeedModules.Admin/ui/admin/requires'
          ]
        });

        $stateProvider.state('admin.settings', {
          url: '/settings',
          title: '设置',
          templateUrl: '/SeedModules.Admin/ui/admin/views/settings.html',
          requires: [
            'SeedModules.AngularUI/ui/requires',
            'SeedModules.Admin/ui/admin/requires'
          ]
        });
      }
    ]);
});
