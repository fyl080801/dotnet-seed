define(['SeedModules.AngularUI/modules/module', 'angular'], function(
  module,
  angular
) {
  'use strict';

  module.factory('SeedModules.AngularUI/modules/factories/delayTimer', [
    '$timeout',
    function($timeout) {
      var delayFn = function(baseOptions) {
        var self = this;
        var timer = 0;
        var options = {
          callback: angular.noop,
          canceling: angular.noop,
          timeout: 1024
        };

        this.options = function(opts) {
          if (opts) {
            options = $.extend(options, opts);
            return self;
          }
          return options;
        };

        this.invoke = function() {
          self.cancel();
          timer = $timeout(function() {
            options.callback();
          }, options.timeout);
        };

        this.cancel = function() {
          (options.canceling || angular.noop)();
          $timeout.cancel(timer);
        };

        this.options(baseOptions);

        return this;
      };

      return delayFn;
    }
  ]);
});
