define([
    'SeedModules.AngularUI/ui/module'
], function (module) {
    'use strict';

    module.service('SeedModules.AngularUI/ui/services/apiService', [
        '$q',
        '$http',
        'app.factories.httpDataHandler',
        function ($q, $http, httpDataHandler) {

            function resolveHttp(method, url, data, options) {
                var defer = $q.defer();

                var configs = $.extend(options, {
                    method: method,
                    url: url,
                    data: data
                });

                $http(configs)
                    .then(function (response) {
                        if (response.status === 500) {
                            httpDataHandler.doError(response, defer);
                        } else {
                            httpDataHandler.doResponse(response, defer);
                        }
                    }, function (response) {
                        httpDataHandler.doError(response, defer);
                    });

                return defer;
            }

            this.get = function (url, options) {
                return resolveHttp('GET', url, undefined, options).promise;
            };

            this.post = function (url, data, options) {
                return resolveHttp('POST', url, data, options).promise;
            };

            this.put = function (url, data, options) {
                return resolveHttp('PUT', url, data, options).promise;
            };

            this.patch = function (url, data, options) {
                return resolveHttp('PATCH', url, data, options).promise;
            };

            this.drop = function (url, options) {
                return resolveHttp('DELETE', url, undefined, options).promise;
            };

        }
    ]);
});