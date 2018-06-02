import boot = require('SeedModules.PageBuilder/modules/boot');

class ConfigRouteClass {
  static $inject = ['$stateProvider'];
  constructor($stateProvider: app.configs.IRequireStateProvider) {
    $stateProvider.state('admin.pagebuilder_page', {
      url: '/pagebuilder_page',
      title: '页面管理',
      templateUrl:
        '/SeedModules.PageBuilder/modules/components/builder/page.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.PageBuilder/modules/requires'
      ]
    });

    $stateProvider.state('admin.pagebuilder_serversettings', {
      url: '/pagebuilder_serversettings',
      title: '服务设置',
      templateUrl:
        '/SeedModules.PageBuilder/modules/components/server/settings.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.PageBuilder/modules/requires'
      ]
    });
  }
}

class RunClass {
  static $inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
  constructor($state, nav) {
    nav.add({
      text: '定制管理',
      icon: 'fab fa-fort-awesome fa-fw',
      order: 5,
      children: [
        {
          text: '服务设置',
          itemClicked: evt => {
            $state.go('admin.pagebuilder_serversettings');
          }
        },
        {
          text: '页面管理',
          itemClicked: evt => {
            $state.go('admin.pagebuilder_page');
          }
        },
        {
          text: '数据源'
        }
      ]
    });
  }
}

boot.config(ConfigRouteClass).run(RunClass);
