define(["require", "exports", "angular", "app/application"], function (require, exports, angular) {
    "use strict";
    return angular
        .module('modules.mindPlus.mind', [
        'ui.router'
    ])
        .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('mindeditor', {
                url: '/mindeditor/{id}',
                templateUrl: '/SeedModules.MindPlus/modules/mind/views/editor.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.MindPlus/modules/mind/requires'
                ]
            });
        }
    ]);
});
//# sourceMappingURL=module.js.map