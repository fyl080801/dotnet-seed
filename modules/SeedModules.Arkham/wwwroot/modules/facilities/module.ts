import angular = require('angular');
import 'app/application';

class Config {
  static $inject = ['$stateProvider'];
  constructor($stateProvider: app.configs.IRequireStateProvider) {
    $stateProvider.state('admin.arkhamhome', {
      url: '/arkhamhome',
      title: '病案管理',
      templateUrl: '/SeedModules.Arkham/modules/facilities/views/home.html',
      requires: ['SeedModules.AngularUI/modules/requires', 'SeedModules.Arkham/modules/facilities/requires']
    });
  }
}

class Run {
  static $inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
  constructor($state: ng.ui.IStateService, nav) {
    nav.add({
      text: '心理健康',
      icon: 'fas fa-brain fa-fw',
      order: 50,
      children: [
        {
          text: '病案管理',
          itemClicked: evt => {
            $state.go('admin.arkhamhome');
          }
        },
        {
          text: '患者管理',
          itemClicked: evt => {}
        }
      ]
    });
  }
}

export = angular
  .module('modules.arkham.facilities', ['ui.router'])
  .config(Config)
  .run(Run);
