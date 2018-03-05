define(['SeedModules.Admin/ui/admin/configs'], function(configs) {
  'use strict';

  configs.run([
    '$state',
    'SeedModules.Admin/ui/admin/configs/nav',
    function($state, nav) {
      nav.add({
        text: '系统管理',
        icon: 'fas fa-cog fa-fw',
        order: -1,
        children: [
          {
            text: '用户管理',
            itemClicked: function(evt) {
              $state.go('admin.users');
            }
          },
          {
            text: '角色管理',
            itemClicked: function(evt) {
              $state.go('admin.roles');
            }
          }
        ]
      });
    }
  ]);
});
