define(['SeedModules.Admin/modules/admin/configs'], function(configs) {
  'use strict';

  configs.config([
    '$provide',
    function($provide) {
      var permissions = (function(data) {
        return new Function('return ' + data + ';')();
      })($('#app').attr('permissions'));

      $provide.constant('$permissions', permissions);
    }
  ]);
});
