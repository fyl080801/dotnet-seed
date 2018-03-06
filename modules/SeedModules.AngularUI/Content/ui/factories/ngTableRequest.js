define(['SeedModules.AngularUI/ui/module'], function(module) {
  'use strict';

  module.factory('SeedModules.AngularUI/ui/factories/ngTableRequest', [
    '$location',
    'SeedModules.AngularUI/ui/factories/ngTableParams',
    'SeedModules.AngularUI/ui/services/requestService',
    function($location, ngTableParams, requestService) {
      function getData(params, requestOptions) {
        var query = $location.search(requestOptions.url);
        var url = requestOptions.url.split(/[&?]/)[0];

        query.page = params.page();
        query.count = params.count();
        var queryArray = [];
        for (var n in query) {
          queryArray.push(n + '=' + query[n]);
        }
        var urlString = [url, queryArray.join('&')].join('?');
        return requestService
          .url(urlString)
          .options(requestOptions)
          .post($.extend({}, requestOptions.data))
          .then(function(result) {
            params.total(result.total);
            return result.list;
          });
      }

      return function(newOptions) {
        var self = this;
        var options = {};

        if (angular.isDefined(newOptions)) {
          angular.extend(options, newOptions);
        }

        this.ngTableParams = function(newParams, newSettings) {
          return new ngTableParams(
            newParams,
            $.extend(newSettings, {
              getData: function(params) {
                return getData(params, options);
              }
            })
          );
        };

        return this;
      };
    }
  ]);
});
