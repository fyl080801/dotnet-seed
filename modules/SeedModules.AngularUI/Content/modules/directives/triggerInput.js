define(['SeedModules.AngularUI/modules/module'], function(module) {
  'use strict';

  module.directive('triggerInput', [
    'SeedModules.AngularUI/modules/factories/delayTimer',
    function(delayTimer) {
      return {
        restrict: 'AE',
        replace: true,
        scope: {
          ngModel: '=',
          mark: '=',
          callback: '&',
          canceling: '&',
          timeout: '@'
        },
        templateUrl:
          '/SeedModules.AngularUI/modules/templates/triggerInput.html',
        link: function(scope, element, attrs, ctl) {
          var delayTrigger = new delayTimer({
            callback: scope.callback || angular.noop,
            canceling: scope.canceling || angular.noop,
            timeout: scope.timeout ? scope.timeout : 2000
          });
          scope.modelChanged = function() {
            delayTrigger.invoke();
          };
          scope.reset = function() {
            scope.ngModel = '';
            delayTrigger.invoke();
          };
        }
      };
    }
  ]);
});
