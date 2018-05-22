import angular = require('angular');
import application = require('app/application');
import 'SeedModules.Admin/modules/admin/configs/nav';
import 'SeedModules.Admin/modules/admin/configs/menus';
import 'SeedModules.Admin/modules/admin/configs/router';
import 'SeedModules.Admin/modules/admin/configs/environment';

class AdminModule {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: app.configs.IRequireStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $urlRouterProvider.otherwise('/admin/dashboard');

    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: '/SeedModules.Admin/modules/admin/views/admin.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Admin/modules/admin/requires'
      ]
    });

    $stateProvider.state('admin.dashboard', {
      url: '/dashboard',
      templateUrl: '/SeedModules.Admin/modules/admin/views/dashboard.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Admin/modules/admin/requires'
      ]
    });

    $stateProvider.state('admin.users', {
      url: '/users',
      title: '用户管理',
      templateUrl: '/SeedModules.Admin/modules/admin/views/users.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Admin/modules/admin/requires'
      ]
    });

    $stateProvider.state('admin.roles', {
      url: '/roles',
      title: '角色管理',
      templateUrl: '/SeedModules.Admin/modules/admin/views/roles.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Admin/modules/admin/requires'
      ]
    });

    $stateProvider.state('admin.settings', {
      url: '/settings',
      title: '设置',
      templateUrl: '/SeedModules.Admin/modules/admin/views/settings.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Admin/modules/admin/requires'
      ]
    });
  }
}

application['requires'].push('modules.admin');

angular.module('modules.admin', ['modules.admin.boot']).config(AdminModule);
