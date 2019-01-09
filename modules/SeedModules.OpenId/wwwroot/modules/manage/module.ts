import angular = require('angular');
import 'app/application';

class Config {
  static $inject = ['$stateProvider'];
  constructor($stateProvider: app.configs.IRequireStateProvider) {
    $stateProvider.state('admin.oauth2client', {
      templateUrl: '/SeedModules.OpenId/modules/manage/views/application.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.OpenId/modules/manage/requires'
      ]
    });
  }
}

class Run {
  static $inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
  constructor($state: ng.ui.IStateService, nav) {
    nav.add({
      text: '第三方应用',
      icon: 'fas fa-window-maximize fa-fw',
      order: 50,
      children: [
        {
          text: '客户端',
          itemClicked: evt => {
            $state.go('admin.oauth2client');
          }
        },
        {
          text: '权限',
          itemClicked: evt => {}
        }
      ]
    });
  }
}

export = angular
  .module('modules.openid.manage', ['ui.router'])
  .config(Config)
  .run(Run);
