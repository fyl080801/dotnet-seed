define(["require", "exports", "angular", "app/application"], function (require, exports, angular) {
    "use strict";
    var ConfigClass = (function () {
        function ConfigClass($stateProvider) {
            $stateProvider.state('admin.features', {
                url: '/features',
                title: '功能管理',
                templateUrl: '/SeedModules.Features/modules/views/features.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.Features/modules/requires'
                ]
            });
        }
        ConfigClass.$inject = ['$stateProvider'];
        return ConfigClass;
    }());
    var RunClass = (function () {
        function RunClass($state, nav) {
            nav.add({
                text: '功能管理',
                icon: 'fas fa-cubes fa-fw',
                order: 2,
                itemClicked: function (evt) {
                    $state.go('admin.features');
                }
            });
        }
        RunClass.$inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
        return RunClass;
    }());
    return angular
        .module('modules.features', ['ui.router'])
        .config(ConfigClass)
        .run(RunClass);
});
//# sourceMappingURL=module.js.map