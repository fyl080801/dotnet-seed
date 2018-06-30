define(['SeedModules.MindPlus/modules/admin/configs'], function (configs) {
    'use strict';
    configs.run([
        '$state',
        'SeedModules.Admin/modules/admin/configs/nav',
        function ($state, nav) {
            nav.add({
                text: '文档服务管理',
                icon: 'fas fa-server fa-fw',
                itemClicked: function (item) {
                    $state.go('admin.mindsettings');
                }
            });
        }
    ]);
});
//# sourceMappingURL=menus.js.map