define([
    'SeedModules.AngularUI/ui/module'
], function (module) {
    'use strict';

    module.service('SeedModules.AngularUI/ui/services/requestService', [
        '$q',
        '$http',
        '$modal',
        '$appConfig',
        'app.factories.httpDataHandler',
        function ($q, $http, $modal, $appConfig, httpDataHandler) {

            function resolveHttp(method, apiDefer) {
                var defer = $q.defer();

                var configs = $.extend({
                    showLoading: true,
                    dataOnly: false
                }, apiDefer.$$options);

                configs.method = method;
                configs.url = $appConfig.prefix + apiDefer.$$url;
                configs.data = apiDefer.$$data;

                var loading = configs.showLoading ? $modal
                    .open({
                        templateUrl: '/SeedModules.AngularUI/ui/views/Loading.html',
                        size: 'sm'
                    }) : null;

                $http(configs)
                    .then(function (response) {
                        if (loading) loading.close();

                        if (response.status >= 400) {
                            httpDataHandler.doError(response, defer);
                        } else {
                            httpDataHandler.doResponse(response, defer);
                        }
                    }, function (response) {
                        if (loading) loading.close();

                        httpDataHandler.doError(response, defer);
                    });

                return defer;
            }

            this.url = function (url) {
                var defer = $q.defer();

                defer.$$url = url;

                defer.promise.options = function (options) {
                    defer.$$options = options;
                    return defer.promise;
                };

                defer.promise.get = function () {
                    return resolveHttp('GET', defer).promise;
                };

                defer.promise.post = function (data) {
                    defer.$$data = data;
                    return resolveHttp('POST', defer).promise;
                };

                defer.promise.put = function (data) {
                    defer.$$data = data;
                    return resolveHttp('PUT', defer).promise;
                };

                defer.promise.patch = function (data) {
                    defer.$$data = data;
                    return resolveHttp('PATCH', defer).promise;
                };

                defer.promise.drop = function () {
                    return resolveHttp('DELETE', defer).promise;
                };

                return defer.promise;
            };

        }
    ]);
});