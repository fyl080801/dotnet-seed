define(["require", "exports", "angular", "app/application"], function (require, exports, angular) {
    "use strict";
    var ConfigRouteClass = (function () {
        function ConfigRouteClass($stateProvider) {
            $stateProvider.state('admin.sqlbuilder', {
                url: '/sqlbuilder',
                title: '查询管理',
                templateUrl: '/SeedModules.SqlBuilder/modules/views/manage.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.SqlBuilder/modules/requires'
                ]
            });
        }
        ConfigRouteClass.$inject = ['$stateProvider'];
        return ConfigRouteClass;
    }());
    var RunClass = (function () {
        function RunClass($state, nav) {
            nav.add({
                text: '查询管理',
                icon: 'fab fa-searchengin fa-fw',
                order: 6,
                itemClicked: function (evt) {
                    $state.go('admin.sqlbuilder');
                }
            });
        }
        RunClass.$inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
        return RunClass;
    }());
    return angular
        .module('modules.sqlbuilder', [])
        .config(ConfigRouteClass)
        .run(RunClass);
});
