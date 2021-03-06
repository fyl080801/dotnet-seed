define(["require", "exports", "angular", "app/application"], function (require, exports, angular) {
    "use strict";
    var Config = (function () {
        function Config($stateProvider) {
            $stateProvider.state('admin.arkhamhome', {
                url: '/arkhamhome',
                title: '病案管理',
                templateUrl: '/SeedModules.Arkham/modules/facilities/views/home.html',
                requires: ['SeedModules.AngularUI/modules/requires', 'SeedModules.Arkham/modules/facilities/requires']
            });
            $stateProvider.state('admin.arkhampatient', {
                url: '/arkhampatient',
                title: '患者管理',
                templateUrl: '/SeedModules.Arkham/modules/facilities/views/patient.html',
                requires: ['SeedModules.AngularUI/modules/requires', 'SeedModules.Arkham/modules/facilities/requires']
            });
        }
        Config.$inject = ['$stateProvider'];
        return Config;
    }());
    var Run = (function () {
        function Run($state, nav) {
            nav.add({
                text: '心理健康',
                icon: 'fas fa-brain fa-fw',
                order: 50,
                children: [
                    {
                        text: '病案管理',
                        itemClicked: function (evt) {
                            $state.go('admin.arkhamhome');
                        }
                    },
                    {
                        text: '患者管理',
                        itemClicked: function (evt) {
                            $state.go('admin.arkhampatient');
                        }
                    }
                ]
            });
        }
        Run.$inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
        return Run;
    }());
    return angular
        .module('modules.arkham.facilities', ['ui.router'])
        .config(Config)
        .run(Run);
});
//# sourceMappingURL=module.js.map