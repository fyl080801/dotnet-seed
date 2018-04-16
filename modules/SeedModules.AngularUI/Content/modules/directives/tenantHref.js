define(['SeedModules.AngularUI/modules/module'], function(module) {
  'use strict';

  module.directive('tenantHref', [
    '$appConfig',
    function($appConfig) {
      return {
        restrict: 'A',
        replace: false,
        scope: {
          tenantHref: '@'
        },
        link: function(scope, element, attrs, ctl) {
          element = $(element);
          element.attr(
            'href',
            $appConfig.siteSettings.prefix + scope.tenantHref
          );
        }
      };
    }
  ]);
});
