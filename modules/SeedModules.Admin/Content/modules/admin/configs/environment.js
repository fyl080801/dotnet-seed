define(['SeedModules.Admin/modules/admin/configs'], function(configs) {
  'use strict';

  configs.config([
    '$provide',
    function($provide) {
      $provide.constant(
        '$permissions',
        JSON.parse($('#app').attr('permissions'))
      );
    }
  ]);
});
