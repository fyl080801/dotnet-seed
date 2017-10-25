define('app/factories', [], function () {
    'use strict';
    return angular.module('app.factories', []);
});
define('app/factories/httpState', ['app/factories'], function (factories) {
    'use strict';
    factories.factory('app.factories.httpState', [
        '$q',
        '$appEnvironment',
        function ($q, $appEnvironment) {
            return {
                request: function (configs) {
                    $appEnvironment.ajaxState = {
                        loading: true,
                        url: configs.url,
                        method: configs.method,
                        data: configs.data
                    };
                    return configs;
                },
                requestError: function (err) {
                    $appEnvironment.ajaxState = {
                        loading: false,
                        url: null,
                        method: null,
                        data: null
                    };
                    return err;
                },
                response: function (response) {
                    $appEnvironment.ajaxState = {
                        loading: false,
                        url: null,
                        method: null,
                        data: null
                    };
                    return response;
                },
                responseError: function (err) {
                    $appEnvironment.ajaxState = {
                        loading: false,
                        url: null,
                        method: null,
                        data: null
                    };
                    return err;
                }
            };
        }
    ]);
});
define('app/factories/httpDataHandler', ['app/factories'], function (factories) {
    'use strict';
    factories.factory('app.factories.httpDataHandler', [
        '$modal',
        function ($modal) {
            var handler = {
                doResponse: function (response, defered) {
                    response.data = response.data ? response.data : {};
                    if (response.data && response.data.success === false) {
                        handler.doError(response, defered);
                    } else {
                        defered.resolve(response.data);
                    }
                },
                doError: function (response, defered) {
                    response.data = response.data ? response.data : {};
                    $modal.open({
                        templateUrl: 'templates/modal/Error.html',
                        data: { text: response.data.message }
                    });
                    defered.reject(response.data);
                }
            };
            return handler;
        }
    ]);
});
define('app/configs', [], function () {
    'use strict';
    return angular.module('app.configs', ['ui.router']);
});
define('app/configs/appConfig', ['app/configs'], function (configs) {
    'use strict';
    configs.config([
        '$provide',
        function ($provide) {
            var app = $('#app').length > 0 ? $('#app') : null;
            $provide.constant('$appConfig', {
                serverUrl: app ? app.attr('data-server') : '',
                debug: app ? eval(app.attr('data-debug')) ? true : false : false
            });
        }
    ]);
});
define('app/configs/dependencyLoader', [
    'require',
    'app/configs'
], function (require, configs) {
    'use strict';
    configs.config([
        '$stateProvider',
        function ($stateProvider) {
            var stateFn = $stateProvider.state;
            $stateProvider.state = function (state, config) {
                if (config.dependencies) {
                    var resolve = config.resolve || {};
                    resolve.$deps = resolveDependencies(config.dependencies);
                    config.resolve = resolve;
                }
                return stateFn(state, config);
            };
            function resolveDependencies(dependencies) {
                if (typeof dependencies === 'string') {
                    dependencies = [dependencies];
                }
                return [
                    '$q',
                    function ($q) {
                        var defer = $q.defer();
                        require(dependencies, function () {
                            defer.resolve(arguments);
                        });
                        return defer.promise;
                    }
                ];
            }
        }
    ]);
});
define('app/configs/appEnvironment', ['app/configs'], function (configs) {
    'use strict';
    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$appEnvironment', {
                ajaxState: {
                    loading: false,
                    url: null,
                    method: null,
                    data: null
                },
                theme: null
            });
        }
    ]);
});
define('app/configs/rootScope', ['app/configs'], function (configs) {
    'use strict';
    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('$rootScope', [
                '$delegate',
                '$appEnvironment',
                function ($delegate, $appEnvironment) {
                    $delegate.$appEnvironment = $appEnvironment;
                    return $delegate;
                }
            ]);
        }
    ]);
});
define('app/configs/modal', ['app/configs'], function (configs) {
    'use strict';
    configs.constant('app.configs.modal', {
        modals: {},
        _counter: 0
    }).config([
        '$provide',
        'app.configs.modal',
        function ($provide, modal) {
            $provide.decorator('$modal', [
                '$delegate',
                '$rootScope',
                function ($delegate, $rootScope) {
                    var openFn = $delegate.open;
                    $delegate.closeAll = function () {
                        for (var i in modal.modals) {
                            modal.modals[i].dismiss();
                        }
                    };
                    $delegate.open = function (options) {
                        options.isolate = options.isolate === undefined ? true : options.isolate;
                        options.scope = options.scope ? options.scope : $rootScope.$new(options.isolate);
                        options.scope.$data = options.data ? options.data : options.scope.$data ? options.scope.$data : {};
                        options.scope.$handlers = options.handlers ? options.handlers : options.scope.$handlers ? options.scope.$handlers : {};
                        options.scope.$stores = options.stores ? options.stores : options.scope.$stores ? options.scope.$stores : {};
                        options.backdrop = options.backdrop ? options.backdrop : 'static';
                        if (options.single === true) {
                            $delegate.closeAll();
                        }
                        var modalInstance = openFn(options);
                        modalInstance.index = ++modal._counter;
                        modalInstance.result.then(function () {
                            delete modal.modals[modalInstance.index];
                        }, function () {
                            delete modal.modals[modalInstance.index];
                        });
                        modal.modals[modal._counter] = modalInstance;
                        return modalInstance;
                    };
                    return $delegate;
                }
            ]);
        }
    ]);
});
define('app/configs/http', ['app/configs'], function (configs) {
    'use strict';
    configs.config([
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.defaults.headers.get = !$httpProvider.defaults.headers.get ? {} : $httpProvider.defaults.headers.get;
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get.Pragma = 'no-cache';
            $httpProvider.interceptors.push('app.factories.httpState');
            jQuery.support.cors = true;
        }
    ]);
});
define('app/services', [], function () {
    'use strict';
    return angular.module('app.services', []);
});
define('app/services/ajaxService', ['app/services'], function (services) {
    'use strict';
    services.service('app.services.ajaxService', [
        '$q',
        '$modal',
        '$appConfig',
        'app.factories.httpDataHandler',
        function ($q, $modal, $appConfig, httpDataHandler) {
        }
    ]);
});
define('app/services/httpService', ['app/services'], function (services) {
    'use strict';
    services.service('app.services.httpService', [
        '$http',
        '$q',
        '$modal',
        '$appConfig',
        'app.factories.httpDataHandler',
        function ($http, $q, $modal, $appConfig, httpDataHandler) {
            var me = this;
            this.resolveUrl = function (url) {
                return url.indexOf('http://') === 0 || url.indexOf('https://') === 0 ? url : $appConfig.serverUrl + url;
            };
            this.get = function (url) {
                var defer = $q.defer();
                $http({
                    method: 'get',
                    url: me.resolveUrl(url),
                    withCredentials: false
                }).then(function (response) {
                    httpDataHandler.doResponse(response, defer);
                }, function (response) {
                    httpDataHandler.doError(response, defer);
                });
                return defer.promise;
            };
            this.post = function (url, params) {
                var defer = $q.defer();
                $http({
                    method: 'post',
                    data: params,
                    url: me.resolveUrl(url),
                    withCredentials: false,
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
                }).then(function (response) {
                    httpDataHandler.doResponse(response, defer);
                }, function (response) {
                    httpDataHandler.doError(response, defer);
                });
                return defer.promise;
            };
            this.jsonp = function (url, params) {
                var defer = $q.defer();
                $http({
                    method: 'jsonp',
                    data: params,
                    url: me.resolveUrl(url),
                    withCredentials: false
                }).then(function (response) {
                    httpDataHandler.doResponse(response, defer);
                }, function (response) {
                    httpDataHandler.doError(response, defer);
                });
                return defer.promise;
            };
        }
    ]);
});
define('app/services/popupService', ['app/services'], function (services) {
    'use strict';
    var informationTemplate = '<div><div class="modal-header"><h4 class="modal-title"><i class="glyphicon glyphicon-info-sign"></i>&nbsp;消息</h4></div><div class="modal-body"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close()"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button></div></div>';
    var errorTemplate = '<div><div class="modal-header"><h4 class="modal-title"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;错误</h4></div><div class="modal-body"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close()"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button></div></div>';
    var confirmTemplate = '<div><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-question-sign"></span>&nbsp;确认</h4></div><div class="modal-body clearfix"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close(true)"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button><button class="btn btn-default" type="button" ng-click="$dismiss()"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;取消</button></div></div>';
    services.service('app.services.popupService', [
        '$modal',
        '$q',
        function ($modal, $q) {
            this.information = function (text, size) {
                var defered = $q.defer();
                $modal.open({
                    template: informationTemplate,
                    size: size ? size : 'sm',
                    data: { text: text ? text : '操作成功' }
                }).result.then(function (result) {
                    defered.resolve();
                });
                return defered.promise;
            };
            this.confirm = function (text, size) {
                var defered = $q.defer();
                defered.promise.ok = function (fn) {
                    defered.promise.then(fn);
                    return defered.promise;
                };
                defered.promise.cancel = function (fn) {
                    defered.promise['catch'](fn);
                    return defered.promise;
                };
                $modal.open({
                    template: confirmTemplate,
                    size: size ? size : 'sm',
                    data: { text: text ? text : '是否确认操作\uFF1F' }
                }).result.then(function (result) {
                    if (result === true) {
                        defered.resolve(result);
                    } else {
                        defered.reject(result);
                    }
                });
                return defered.promise;
            };
            this.error = function (text, size) {
                var defered = $q.defer();
                var _data = {};
                if (text === null || text === undefined) {
                    _data.text = '发生错误';
                } else if (Object.prototype.toString.call(text) == '[object Array]') {
                    _data.contents = text;
                } else {
                    _data.text = text;
                }
                $modal.open({
                    template: errorTemplate,
                    size: size ? size : 'sm',
                    data: _data
                }).result.then(function (result) {
                    defered.resolve(result);
                });
                return defered.promise;
            };
        }
    ]);
});
define('app/directives', [], function () {
    'use strict';
    return angular.module('app.directives', []);
});
define('app/directives/title', ['app/directives'], function (directives) {
    'use strict';
    directives.directive('title', [
        '$rootScope',
        '$timeout',
        function ($rootScope, $timeout) {
            var _link = function (scope, element, attrs) {
                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    $timeout(function () {
                        document.title = toState.data && toState.data.title ? toState.data.title : '';
                    });
                });
            };
            return {
                restrict: 'E',
                link: _link
            };
        }
    ]);
});
define('app/directives/theme', ['app/directives'], function (module) {
    'use strict';
    module.directive('theme', [function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {
            };
            var _controller = function ($scope, $element, $attrs, $appEnvironment) {
                $scope.$appEnvironment = $appEnvironment;
            };
            return {
                scope: {
                    normal: '@',
                    path: '@'
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                controller: [
                    '$scope',
                    '$element',
                    '$attrs',
                    '$appEnvironment',
                    _controller
                ],
                template: '<link ng-href="{{path}}/{{$appEnvironment.theme?$appEnvironment.theme:normal}}.css" rel="stylesheet" />'
            };
        }]);
});
define('app/routes', ['angular-ui-router'], function () {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config([
        '$urlRouterProvider',
        '$stateProvider',
        function ($urlRouterProvider, $stateProvider) {
        }
    ]);
});
define('app/routes/run', ['app/routes'], function (routes) {
    'use strict';
    routes.run([
        '$rootScope',
        '$state',
        '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.$previous = fromState;
                $rootScope.$previousParams = fromParams;
            });
            $state.back = function () {
                if ($rootScope.$previous)
                    $state.go($rootScope.$previous.name, $rootScope.$previousParams);
            };
        }
    ]);
});
define('app/application', [
    'angular',
    'jquery',
    'bootstrap',
    'ui-bootstrap-tpls',
    'app/factories/httpState',
    'app/factories/httpDataHandler',
    'app/configs/appConfig',
    'app/configs/dependencyLoader',
    'app/configs/appEnvironment',
    'app/configs/rootScope',
    'app/configs/modal',
    'app/configs/http',
    'app/services/ajaxService',
    'app/services/httpService',
    'app/services/popupService',
    'app/directives/title',
    'app/directives/theme',
    'app/routes/run'
], function () {
    'use strict';
    var moduleFn = angular.module;
    angular.module = function (name, requires, configFn) {
        var angularApp = moduleFn(name, requires, configFn);
        angularApp.config([
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                angularApp.controller = $controllerProvider.register;
                angularApp.directive = $compileProvider.directive;
                angularApp.filter = $filterProvider.register;
                angularApp.factory = $provide.factory;
                angularApp.service = $provide.service;
            }
        ]);
        return angularApp;
    };
    return angular.module('app.application', [
        'ui.bootstrap',
        'app.configs',
        'app.factories',
        'app.services',
        'app.routes',
        'app.directives'
    ]);
});