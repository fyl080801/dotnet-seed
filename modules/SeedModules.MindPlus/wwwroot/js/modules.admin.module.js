define('SeedModules.MindPlus/modules/admin/configs', ['app/application'], function () {
    'use strict';
    return angular.module('modules.mindPlus.admin.configs', []);
});
define('SeedModules.MindPlus/modules/admin/configs/menus', ['SeedModules.MindPlus/modules/admin/configs'], function (configs) {
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
define('SeedModules.MindPlus/modules/admin/module', [
    'require',
    'exports',
    'angular',
    'SeedModules.MindPlus/modules/admin/configs/menus'
], function (require, exports, angular) {
    'use strict';
    return angular.module('modules.mindPlus.admin', [
        'ui.router',
        'modules.mindPlus.admin.configs'
    ]).config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('admin.mindsettings', {
                url: '/mindsettings',
                title: '文档服务管理',
                templateUrl: '/SeedModules.MindPlus/modules/admin/views/mindsettings.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/admin/requires'
                ]
            });
        }
    ]);
});