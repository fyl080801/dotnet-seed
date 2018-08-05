import configs = require('SeedModules.Saas/modules/configs');

class MenusRunClass {
  static $inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
  constructor($state, nav) {
    nav.add({
      text: '托管平台',
      icon: 'fas fa-server fa-fw',
      children: [
        {
          text: '数据库管理',
          itemClicked: function(evt) {
            $state.go('admin.datasources');
          }
        },
        {
          text: '租户管理',
          itemClicked: function(evt) {
            $state.go('admin.tenants');
          }
        }
      ]
    });
  }
}

configs.run(MenusRunClass);
