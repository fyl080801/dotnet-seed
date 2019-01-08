define(["require", "exports", "angular", "app/application"], function (require, exports, angular) {
    "use strict";
    var Config = (function () {
        function Config($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('index', {
                url: '/',
                templateUrl: '/SeedModules.OpenId/modules/oauth2/views/index.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.OpenId/modules/oauth2/requires'
                ]
            });
        }
        Config.$inject = ['$stateProvider', '$urlRouterProvider'];
        return Config;
    }());
    return angular.module('modules.oauth2', ['ui.router']).config(Config);
});
//# sourceMappingURL=module.js.map