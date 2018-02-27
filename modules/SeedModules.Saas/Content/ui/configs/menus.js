define([
    'SeedModules.Saas/ui/configs'
], function (configs) {
    'use strict';

    configs.run([
        '$state',
        'SeedModules.Admin/ui/admin/configs/nav',
        function ($state, nav) {
            nav.add({
                text: '托管平台',
                icon: 'fa fa-server fa-fw',
                children: [{
                    text: '数据源',
                    itemClicked: function (evt) {
                        $state.go('admin.datasources');
                    }
                }, {
                    text: '模板管理',
                    itemClicked: function (evt) {
                        $state.go('admin.projects');
                    }
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