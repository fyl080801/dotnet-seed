define(['SeedModules.Admin/modules/admin/configs'], function(configs) {
  'use strict';

  configs.run([
    '$rootScope',
    '$state',
    '$appEnvironment',
    function($rootScope, $state, $appEnvironment) {
      $rootScope.$on('$stateChangeSuccess', function(
        event,
        toState,
        toParams,
        fromState,
        fromParams
      ) {});
    }
  ]);
});
