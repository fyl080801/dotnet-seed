define(['SeedModules.AngularUI/modules/module'], function(module) {
  'use strict';

  module.factory('SeedModules.AngularUI/modules/factories/ngTableGetDataBcShim', [
    '$q',
    function($q) {
      return createWrapper;

      function createWrapper(getDataFn) {
        return function getDataShim(/*args*/) {
          var $defer = $q.defer();
          var pData = getDataFn.apply(
            this,
            [$defer].concat(Array.prototype.slice.call(arguments))
          );
          if (!pData) {
            // If getData resolved the $defer, and didn't promise us data,
            //   create a promise from the $defer. We need to return a promise.
            pData = $defer.promise;
          }
          return pData;
        };
      }
    }
  ]);
});
