define(["require", "exports", "SeedModules.AngularUI/modules/module", "angular"], function (require, exports, mod, angular) {
    "use strict";
    exports.__esModule = true;
    var RequestContext = (function () {
        function RequestContext(defer) {
            this.defer = defer;
            this.result = defer.promise;
        }
        RequestContext.prototype.cancel = function () {
            this.defer.resolve();
        };
        return RequestContext;
    }());
    var WebApi = (function () {
        function WebApi($q, $http, $modal, $appConfig, httpDataHandler, options) {
            this.$q = $q;
            this.$http = $http;
            this.$modal = $modal;
            this.$appConfig = $appConfig;
            this.httpDataHandler = httpDataHandler;
            this.options = options;
        }
        WebApi.prototype.get = function () {
            return new RequestContext(this.resolveHttp('GET'));
        };
        WebApi.prototype.post = function (data) {
            return new RequestContext(this.resolveHttp('POST', data));
        };
        WebApi.prototype.put = function (data) {
            return new RequestContext(this.resolveHttp('PUT', data));
        };
        WebApi.prototype.patch = function (data) {
            return new RequestContext(this.resolveHttp('PATCH', data));
        };
        WebApi.prototype.drop = function () {
            return new RequestContext(this.resolveHttp('DELETE'));
        };
        WebApi.prototype.resolveHttp = function (method, data) {
            var defer = this.$q.defer();
            var self = this;
            var configs = angular.extend({
                showLoading: true,
                dataOnly: false
            }, this.options);
            configs.method = method;
            configs.url = this.$appConfig.siteSettings.prefix + this.options.url;
            configs.data = data;
            configs.timeout = defer.promise;
            var loading = configs.showLoading
                ? this.$modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/Loading.html',
                    size: 'sm'
                })
                : null;
            this.$http(configs)
                .then(function (response) {
                if (response.status >= 400) {
                    self.httpDataHandler.doError(response, defer);
                }
                else {
                    self.httpDataHandler.doResponse(response, defer);
                }
            })["catch"](function (response) {
                self.httpDataHandler.doError(response, defer);
            })["finally"](function () {
                if (loading)
                    loading.close();
            });
            return defer;
        };
        return WebApi;
    }());
    var WebApiContext = (function () {
        function WebApiContext($q, $http, $modal, $appConfig, httpDataHandler, url) {
            this.$q = $q;
            this.$http = $http;
            this.$modal = $modal;
            this.$appConfig = $appConfig;
            this.httpDataHandler = httpDataHandler;
            this.url = url;
            this.options({ method: 'GET', url: url });
        }
        WebApiContext.prototype.get = function () {
            return this.api.get();
        };
        WebApiContext.prototype.post = function (data) {
            return this.api.post(data);
        };
        WebApiContext.prototype.put = function (data) {
            return this.api.put(data);
        };
        WebApiContext.prototype.patch = function (data) {
            return this.api.patch(data);
        };
        WebApiContext.prototype.drop = function () {
            return this.api.drop();
        };
        WebApiContext.prototype.options = function (options) {
            this.api = new WebApi(this.$q, this.$http, this.$modal, this.$appConfig, this.httpDataHandler, angular.extend(options, { url: this.url }));
            return this;
        };
        return WebApiContext;
    }());
    var RequestService = (function () {
        function RequestService($q, $http, $modal, $appConfig, httpDataHandler) {
            this.$q = $q;
            this.$http = $http;
            this.$modal = $modal;
            this.$appConfig = $appConfig;
            this.httpDataHandler = httpDataHandler;
        }
        RequestService.prototype.url = function (url) {
            return new WebApiContext(this.$q, this.$http, this.$modal, this.$appConfig, this.httpDataHandler, url);
        };
        RequestService.$inject = [
            '$q',
            '$http',
            '$modal',
            '$appConfig',
            'app/factories/httpDataHandler'
        ];
        return RequestService;
    }());
    mod.service('SeedModules.AngularUI/modules/services/requestService', RequestService);
});
//# sourceMappingURL=requestService.js.map