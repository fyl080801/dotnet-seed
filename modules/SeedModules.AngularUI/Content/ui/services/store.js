define([
    'SeedModules.AngularUI/ui/module'
], function (module) {
    'use strict';

    module.service('SeedModules.AngularUI/ui/services/store', [
        '$q',
        'SeedModules.AngularUI/ui/configs/storeAdapter',
        function ($q, storeAdapter) {
            function defered(q) {
                var defer = q.defer();
                defer.apis = [];
                defer.queries = [];
                defer.promise.append = function (path) {
                    defer.apis.push(path);
                    return defer.promise;
                };
                defer.promise.query = function (k, v) {
                    defer.queries.push({
                        key: k,
                        value: v
                    });
                    return defer.promise;
                };
                return defer;
            }

            function deferedWithData(q) {
                var defer = defered(q);
                defer.data = null;
                defer.promise.data = function (data) {
                    defer.data = data;
                    return defer.promise;
                };
                return defer;
            }

            this.get = function () {
                var defer = defered($q);
                storeAdapter.get(defer);
                return defer.promise;
            };

            this.post = function (data) {
                var defer = deferedWithData($q);
                defer.data = null;
                storeAdapter.post(defer, data);
                return defer.promise;
            };

            this.put = function (data) {
                var defer = deferedWithData($q);
                storeAdapter.put(defer, data);
                return defer.promise;
            };

            this.patch = function (data) {
                var defer = deferedWithData($q);
                storeAdapter.patch(defer, data);
                return defer.promise;
            };

            this.drop = function () {
                var defer = deferedWithData($q);
                storeAdapter.drop(defer);
                return defer.promise;
            };
        }
    ]);
});