/// <reference path="../node_modules/@types/angular/index.d.ts" />

export as namespace app;

export = app;

declare namespace app {
  export enum Size {
    sm = 'sm',
    nm = '',
    lg = 'lg'
  }

  /**
   *
   */
  export interface IAppConfig {
    serverUrl?: string;
  }

  /**
   *
   */
  export interface IAjaxState {
    loading: boolean;
    url?: string;
    method?: string;
    data?: object;
  }

  /**
   *
   */
  export interface IAppEnvironment {
    ajaxState: IAjaxState;
    theme?: string;
  }

  export namespace configs {
    export interface IExtendScope extends ng.IScope {
      $data: any;
    }

    /**
     *
     */
    export interface IRequireState extends ng.ui.IState {
      requires?: Array<string>;
      dependencies?: Array<string>;
      title?: string;
    }

    /**
     *
     */
    export interface IRequireStateProvider extends ng.ui.IStateProvider {
      state(name: string, config: IRequireState): ng.ui.IStateProvider;
      state(config: IRequireState): ng.ui.IStateProvider;
      decorator(
        name?: string,
        decorator?: (state: IRequireState, parent: Function) => any
      ): any;
    }

    export interface IExtendStateService extends ng.ui.IStateService {
      back(): ng.IPromise<any>;
    }

    /**
     *
     */
    export interface IExtendRootScopeService extends ng.IRootScopeService {
      $appEnvironment: IAppEnvironment;
      $appConfig: IAppConfig;
      $data: any;
      $state: ng.ui.IStateService;
      $stateParams: ng.ui.IStateParamsService;
      $previous: ng.ui.IState;
      $previousParams: ng.ui.IStateParamsService;
      $new(isolate?: boolean, parent?: ng.IScope): IExtendScope;
    }
  }

  export namespace factories {
    /**
     *
     */
    export interface IHttpDataHandler {
      doResponse<TOutput>(
        response: ng.IHttpResponse<services.IResponseContext<TOutput>>,
        defered: ng.IDeferred<TOutput>
      );
      doError<TOutput>(response, defered: ng.IDeferred<TOutput>);
    }

    /**
     *
     */
    export interface IDelayConfigs {
      callback?: (() => void) | (() => ng.IDeferred<any>);
      canceling?: (() => void);
      timeout?: number;
    }

    export interface IDelayTimerFactory {
      $new(configs: app.factories.IDelayConfigs): IDelayTimer;
    }

    /**
     * 延时执行
     */
    interface IDelayTimer {
      invoke();
      cancel();
      options(configs: IDelayConfigs): IDelayTimer;
    }
  }

  export namespace services {
    /**
     *
     */
    export interface IPopupPromise {
      options(param: ng.ui.bootstrap.IModalSettings): IPopupPromise;
    }

    /**
     *
     */
    export interface IConfirmPromise {
      ok(callback?: ((result: any) => void) | null): IConfirmPromise;
      cancel(callback?: ((reason: any) => void) | null): IConfirmPromise;
    }

    // export interface IPopupConfirmPromise
    //   extends IPopupPromise,
    //     IConfirmPromise {}

    /**
     *
     */
    export interface IRequestContext<T> {
      cancel(): void;
      result: angular.IPromise<T>;
    }

    /**
     *
     */
    export interface IResponseContext<T> {
      success: boolean;
      data?: T;
    }

    /**
     *
     */
    export interface IRequestDefered {
      options(opt: ng.IRequestConfig): IRequestDefered;
      post<TInput, TOutput>(param: TInput): IRequestContext<TOutput>;
      get<TOutput>(): IRequestContext<TOutput>;
    }

    /**
     *
     */
    export interface IHttpService {
      resolveUrl(url: string): string;
      get<TOutput>(url: string): app.services.IRequestContext<TOutput>;
      post<TInput, TOutput>(
        url: string,
        param: TInput
      ): app.services.IRequestContext<TOutput>;
      url(url: string): IRequestDefered;
    }

    /**
     *
     */
    export interface IPopupService {
      information(
        text: string,
        size?: Size
      ): ng.ui.bootstrap.IModalInstanceService;

      confirm(text: string, size?: Size): IConfirmPromise;
    }

    export interface ITreeItem<T> {
      $data: T;
      $parent?: ITreeItem<T>;
      $children?: ITreeItem<T>[];
      $key: any;
    }

    export interface ITreeContext<T> {
      onEach(fn: ((item: ITreeItem<T>) => void)): ITreeContext<T>;
      eachCallback: ((item: ITreeItem<T>) => void);
      result: ng.IPromise<ITreeItem<T>>;
    }

    export interface ITreeConvertContext<T> extends ITreeContext<T> {
      key(name: any): ITreeConvertContext<T>;
      key(): any;
      parentKey(name: any): ITreeConvertContext<T>;
      parentKey(): any;
    }

    /**
     *
     */
    export interface ITreeUtility {
      toTree<T>(data: Array<T>): ITreeConvertContext<T>;
      eachTree<T>(root: ITreeItem<T>): ITreeContext<T>;
    }
  }
}
