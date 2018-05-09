define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/modules/myworks/controllers/mymind', [
    '$appEnvironment',
    function($appEnvironment) {
      $appEnvironment.currentWork = null;
    }
  ]);
});
