define(['SeedModules.MindPlus/modules/portals/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/portals/controllers/index', [
        '$scope',
        '$appConfig',
        function ($scope, $appConfig) {
            $scope.$appConfig = $appConfig;
        }
    ]);
});
//# sourceMappingURL=index.js.map