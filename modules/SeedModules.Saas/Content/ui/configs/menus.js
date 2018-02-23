define([
    'SeedModules.Saas/ui/configs'
], function (configs) {
    'use strict';

    configs.run([
        '$state',
        'SeedModules.Admin/ui/admin/configs/nav',
        function ($state, nav) {
            nav.add({
                text: '平台管理',
                icon: 'fa fa-server',
                children: [{
                    text: '数据源'
                }, {
                    text: '租户管理',
                    itemClicked: function (evt) {
                        $state.go('admin.tenants');
                    }
                }]
            });
        }
    ]);
});