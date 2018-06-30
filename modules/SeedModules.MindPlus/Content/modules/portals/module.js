define(["require", "exports", "angular", "app/application", "angular-ui-router", "schema-form-bootstrap"], function (require, exports, angular) {
    "use strict";
    var ConfigClass = (function () {
        function ConfigClass($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('mindPlus', {
                url: '/',
                templateUrl: '/SeedModules.MindPlus/modules/portals/views/index.html',
                requires: ['SeedModules.MindPlus/modules/portals/requires']
            });
            $stateProvider.state('mindRegister', {
                url: '/register',
                templateUrl: '/SeedModules.MindPlus/modules/portals/views/register.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/portals/requires'
                ]
            });
            $stateProvider.state('mindLogin', {
                url: '/mdlogin',
                templateUrl: '/SeedModules.MindPlus/modules/portals/views/login.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/portals/requires'
                ]
            });
        }
        ConfigClass.$inject = ['$stateProvider', '$urlRouterProvider'];
        return ConfigClass;
    }());
    return angular
        .module('modules.mindPlus.portals', ['ui.router', 'schemaForm'])
        .config(ConfigClass);
});

//# sourceMappingURL=module.js.map
