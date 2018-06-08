import mod = require('SeedModules.AngularUI/modules/module');
import angular = require('angular');

class RequestContext<TOutput>
  implements AngularUI.services.IRequestContext<TOutput> {
  cancel() {
    this.defer.resolve();
  }

  result: angular.IPromise<TOutput>;

  constructor(private defer: ng.IDeferred<TOutput>) {
    this.result = defer.promise;
  }
}

class WebApi implements AngularUI.services.IWebApi {
  get<TOutput>(): AngularUI.services.IRequestContext<TOutput> {
    return new RequestContext<TOutput>(this.resolveHttp<TOutput>('GET'));
  }
  post<TOutput>(data?: any): AngularUI.services.IRequestContext<TOutput> {
    return new RequestContext<TOutput>(this.resolveHttp<TOutput>('POST', data));
  }
  put<TOutput>(data?: any): AngularUI.services.IRequestContext<TOutput> {
    return new RequestContext<TOutput>(this.resolveHttp<TOutput>('PUT', data));
  }
  patch<TOutput>(data?: any): AngularUI.services.IRequestContext<TOutput> {
    return new RequestContext<TOutput>(
      this.resolveHttp<TOutput>('PATCH', data)
    );
  }
  drop<TOutput>(): AngularUI.services.IRequestContext<TOutput> {
    return new RequestContext<TOutput>(this.resolveHttp<TOutput>('DELETE'));
  }

  private resolveHttp<TOutput>(method: string, data?: any) {
    var defer = this.$q.defer<TOutput>();
    var self = this;

    var configs: AngularUI.services.IRequestOptions = angular.extend(
      {
        showLoading: true,
        dataOnly: false
      },
      this.options
    );

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

    this.$http<app.services.IResponseContext<TOutput>>(configs)
      .then(response => {
        if (response.status >= 400) {
          self.httpDataHandler.doError(response, defer);
        } else {
          self.httpDataHandler.doResponse(response, defer);
        }
      })
      .catch(response => {
        self.httpDataHandler.doError(response, defer);
      })
      .finally(() => {
        if (loading) loading.close();
      });

    return defer;
  }

  constructor(
    private $q: ng.IQService,
    private $http: ng.IHttpService,
    private $modal: ng.ui.bootstrap.IModalService,
    private $appConfig: AngularUI.configs.ISeedAppConfig,
    private httpDataHandler: app.factories.IHttpDataHandler,
    private options: AngularUI.services.IRequestOptions
  ) {}
}

class WebApiContext implements AngularUI.services.IWebApiContext {
  get<TOutput>(): AngularUI.services.IRequestContext<TOutput> {
    return this.api.get<TOutput>();
  }
  post<TOutput>(data?: any): AngularUI.services.IRequestContext<TOutput> {
    return this.api.post<TOutput>(data);
  }
  put<TOutput>(data?: any): AngularUI.services.IRequestContext<TOutput> {
    return this.api.put<TOutput>(data);
  }
  patch<TOutput>(data?: any): AngularUI.services.IRequestContext<TOutput> {
    return this.api.patch<TOutput>(data);
  }
  drop<TOutput>(): AngularUI.services.IRequestContext<TOutput> {
    return this.api.drop<TOutput>();
  }
  options(
    options: AngularUI.services.IRequestOptions
  ): AngularUI.services.IWebApi {
    this.api = new WebApi(
      this.$q,
      this.$http,
      this.$modal,
      this.$appConfig,
      this.httpDataHandler,
      angular.extend(options, { url: this.url })
    );
    return this;
  }

  private api: AngularUI.services.IWebApi;

  constructor(
    private $q: ng.IQService,
    private $http: ng.IHttpService,
    private $modal: ng.ui.bootstrap.IModalService,
    private $appConfig: AngularUI.configs.ISeedAppConfig,
    private httpDataHandler: app.factories.IHttpDataHandler,
    private url: string
  ) {
    this.api = new WebApi(
      this.$q,
      this.$http,
      this.$modal,
      this.$appConfig,
      this.httpDataHandler,
      {
        method: 'GET',
        url: url
      }
    );
  }
}

class RequestService implements AngularUI.services.IRequestService {
  url(url: string): AngularUI.services.IWebApiContext {
    return new WebApiContext(
      this.$q,
      this.$http,
      this.$modal,
      this.$appConfig,
      this.httpDataHandler,
      url
    );
  }

  static $inject = [
    '$q',
    '$http',
    '$modal',
    '$appConfig',
    'app/factories/httpDataHandler'
  ];

  constructor(
    private $q: ng.IQService,
    private $http: ng.IHttpService,
    private $modal: ng.ui.bootstrap.IModalService,
    private $appConfig: AngularUI.configs.ISeedAppConfig,
    private httpDataHandler: app.factories.IHttpDataHandler
  ) {}
}

mod.service(
  'SeedModules.AngularUI/modules/services/requestService',
  RequestService
);

// define(['SeedModules.AngularUI/modules/module'], function(module) {
//   'use strict';

//   module.service('SeedModules.AngularUI/modules/services/requestService', [
//     '$q',
//     '$http',
//     '$modal',
//     '$appConfig',
//     'app/factories/httpDataHandler',
//     function($q, $http, $modal, $appConfig, httpDataHandler) {
//       function resolveHttp(method, apiDefer) {
//         var defer = $q.defer();

//         var configs = $.extend(
//           {
//             showLoading: true,
//             dataOnly: false
//           },
//           apiDefer.$$options
//         );

//         configs.method = method;
//         configs.url = $appConfig.siteSettings.prefix + apiDefer.$$url;
//         configs.data = apiDefer.$$data;

//         var loading = configs.showLoading
//           ? $modal.open({
//               templateUrl: '/SeedModules.AngularUI/modules/views/Loading.html',
//               size: 'sm'
//             })
//           : null;

//         $http(configs).then(
//           function(response) {
//             if (loading) loading.close();

//             if (response.status >= 400) {
//               httpDataHandler.doError(response, defer);
//             } else {
//               httpDataHandler.doResponse(response, defer);
//             }
//           },
//           function(response) {
//             if (loading) loading.close();

//             httpDataHandler.doError(response, defer);
//           }
//         );

//         return defer;
//       }

//       this.url = function(url) {
//         var defer = $q.defer();

//         defer.$$url = url;

//         defer.promise.options = function(options) {
//           defer.$$options = options;
//           return defer.promise;
//         };

//         defer.promise.get = function() {
//           return resolveHttp('GET', defer).promise;
//         };

//         defer.promise.post = function(data) {
//           defer.$$data = data;
//           return resolveHttp('POST', defer).promise;
//         };

//         defer.promise.put = function(data) {
//           defer.$$data = data;
//           return resolveHttp('PUT', defer).promise;
//         };

//         defer.promise.patch = function(data) {
//           defer.$$data = data;
//           return resolveHttp('PATCH', defer).promise;
//         };

//         defer.promise.drop = function() {
//           return resolveHttp('DELETE', defer).promise;
//         };

//         return defer.promise;
//       };
//     }
//   ]);
// });
