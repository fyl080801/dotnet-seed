import angular = require('angular');
import 'app/application';

class ConfigRouteClass {
  static $inject = ['$stateProvider'];
  constructor($stateProvider: app.configs.IRequireStateProvider) {
    $stateProvider.state('admin.sqlbuilder', {
      url: '/sqlbuilder',
      title: '查询管理',
      templateUrl: '/SeedModules.SqlBuilder/modules/views/manage.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.SqlBuilder/modules/requires'
      ]
    });
  }
}

class RunClass {
  static $inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
  constructor($state, nav) {
    nav.add({
      text: '查询管理',
      icon: 'fab fa-searchengin fa-fw',
      order: 6,
      itemClicked: evt => {
        $state.go('admin.sqlbuilder');
      }
    });
  }
}

export = angular
  .module('modules.sqlbuilder', [])
  .config(ConfigRouteClass)
  .run(RunClass);
