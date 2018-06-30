define(["require", "exports", "SeedModules.Saas/modules/configs"], function (require, exports, configs) {
    "use strict";
    exports.__esModule = true;
    var MenusRunClass = (function () {
        function MenusRunClass($state, nav) {
            nav.add({
                text: '托管平台',
                icon: 'fas fa-server fa-fw',
                children: [
                    {
                        text: '数据库管理',
                        itemClicked: function (evt) {
                            $state.go('admin.datasources');
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
        MenusRunClass.$inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
        return MenusRunClass;
    }());
    configs.run(MenusRunClass);
});

//# sourceMappingURL=menus.js.map
