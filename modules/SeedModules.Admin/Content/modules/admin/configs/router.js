define(['SeedModules.Admin/modules/admin/boot'], function (configs) {
    'use strict';
    configs.run([
        '$rootScope',
        '$state',
        '$appEnvironment',
        function ($rootScope, $state, $appEnvironment) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) { });
        }
    ]);
});
//# sourceMappingURL=router.js.map