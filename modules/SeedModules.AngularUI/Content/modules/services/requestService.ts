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

    this.options.url = this.$appConfig.siteSettings.prefix + this.options.url;

    var configs: ng.IRequestConfig = {
      method: method,
      url: '',
      data: data,
      timeout: defer.promise
    };

    var loading = this.options.showLoading
      ? this.$modal.open({
          templateUrl: '/SeedModules.AngularUI/modules/views/Loading.html',
          size: 'sm'
        })
      : null;

    this.$http<app.services.IResponseContext<TOutput>>(
      angular.extend(configs, this.options)
    )
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
    this.options({ url: url });
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
