define(['SeedModules.Saas/modules/configs'], function (configs) {
    'use strict';
    configs.run([
        '$state',
        'SeedModules.Admin/modules/admin/configs/nav',
        function ($state, nav) {
            nav.add({
                text: '托管平台',
                icon: 'fas fa-server fa-fw',
                children: [
                    {
                        text: '数据源',
                        itemClicked: function (evt) {
                            $state.go('admin.datasources');
                        }
                    },
                    {
                        text: '模板管理',
                        itemClicked: function (evt) {
                            $state.go('admin.projects');
                        }
                    },
                    {
                        text: '租户管理',
                        itemClicked: function (evt) {
                            $state.go('admin.tenants');
                        }
                    }
                ]
            });
        }
    ]);
});
//# sourceMappingURL=menus.js.map