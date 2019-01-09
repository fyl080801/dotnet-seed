define(["require", "exports", "angular", "app/application"], function (require, exports, angular) {
    "use strict";
    var Config = (function () {
        function Config($stateProvider) {
            $stateProvider.state('admin.oauth2client', {
                templateUrl: '/SeedModules.OpenId/modules/manage/views/application.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.OpenId/modules/manage/requires'
                ]
            });
        }
        Config.$inject = ['$stateProvider'];
        return Config;
    }());
    var Run = (function () {
        function Run($state, nav) {
            nav.add({
                text: '第三方应用',
                icon: 'fas fa-window-maximize fa-fw',
                order: 50,
                children: [
                    {
                        text: '客户端',
                        itemClicked: function (evt) {
                            $state.go('admin.oauth2client');
                        }
                    },
                    {
                        text: '权限',
                        itemClicked: function (evt) { }
                    }
                ]
            });
        }
        Run.$inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
        return Run;
    }());
    return angular
        .module('modules.openid.manage', ['ui.router'])
        .config(Config)
        .run(Run);
});
//# sourceMappingURL=module.js.map