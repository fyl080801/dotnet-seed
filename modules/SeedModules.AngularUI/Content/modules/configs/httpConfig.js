define(['SeedModules.AngularUI/modules/configs'], function(configs) {
  'use strict';

  configs.config([
    '$provide',
    '$httpProvider',
    function($provide, $httpProvider) {
      $provide.decorator('app/factories/httpDataHandler', [
        '$delegate',
        '$rootScope',
        '$modal',
        '$appEnvironment',
        'app/services/popupService',
        function($delegate, $rootScope, $modal, $appEnvironment, popupService) {
          $delegate.doResponse = function(response, defer) {
            if (response.config.dataOnly) {
              defer.resolve(response.data, response);
            } else if (response.data.success) {
              defer.resolve(response.data.data, response);
            } else {
              $delegate.doError(
                $.extend(response, {
                  statusText: response.data.message
                }),
                defer
              );
            }
          };

          $delegate.doError = function(response, defer) {
            popupService.error(response.statusText);
            defer.reject(response);
          };

          return $delegate;
        }
      ]);
    }
  ]);
});
