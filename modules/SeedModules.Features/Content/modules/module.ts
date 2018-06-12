import angular = require('angular');
import 'app/application';

class ConfigClass {
  static $inject = ['$stateProvider'];
  constructor($stateProvider: app.configs.IRequireStateProvider) {
    $stateProvider.state('admin.features', {
      url: '/features',
      title: '功能管理',
      templateUrl: '/SeedModules.Features/modules/views/features.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.Features/modules/requires'
      ]
    });
  }
}

class RunClass {
  static $inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
  constructor($state: ng.ui.IStateService, nav) {
    nav.add({
      text: '功能管理',
      icon: 'fas fa-cubes fa-fw',
      order: 2,
      itemClicked: function(evt) {
        $state.go('admin.features');
      }
    });
  }
}

export = angular
  .module('modules.features', ['ui.router'])
  .config(ConfigClass)
  .run(RunClass);
