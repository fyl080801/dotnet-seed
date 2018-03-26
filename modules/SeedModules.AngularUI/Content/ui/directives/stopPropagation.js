define(['SeedModules.AngularUI/ui/module'], function(module) {
  'use strict';

  module.directive('stopPropagation', [
    function() {
      return {
        restrict: 'A',
        replace: false,
        link: function(scope, element, attr, ctrl) {
          
        }
      };
    }
  ]);
});
