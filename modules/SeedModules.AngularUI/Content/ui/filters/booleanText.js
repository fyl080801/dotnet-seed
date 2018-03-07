define(['SeedModules.AngularUI/ui/module'], function(module) {
  'use strict';

  module.filter('booleanText', [
    function() {
      return function(val) {
        if (
          val === undefined ||
          val === null ||
          val === 0 ||
          val === false ||
          val === 'false' ||
          val === 'False'
        ) {
          return '否';
        } else {
          return '是';
        }
      };
    }
  ]);
});
