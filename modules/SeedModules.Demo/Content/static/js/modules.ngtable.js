define('modules/ngtable/configs', ['app/application'], function (application) {
    'use strict';
    return angular.module('modules.ngtable.configs', []);
});
define('modules/ngtable/configs/ngTableDefaults', ['modules/ngtable/configs'], function (configs) {
    'use strict';
    configs.value('modules.ngtable.configs.ngTableDefaults', {
        params: {},
        settings: {}
    });
});
define('modules/ngtable/providers', ['app/application'], function (application) {
    'use strict';
    return angular.module('modules.ngtable.providers', []);
});
define('modules/ngtable/providers/ngTableDefaultGetData', ['modules/ngtable/providers'], function (module) {
    'use strict';
    module.provider('modules.ngtable.providers.ngTableDefaultGetData', [function () {
            var provider = this;
            provider.$get = ngTableDefaultGetData;
            provider.filterFilterName = 'filter';
            provider.sortingFilterName = 'orderBy';
            ngTableDefaultGetData.$inject = ['$filter'];
            function ngTableDefaultGetData($filter) {
                return getData;
                function getData(data, params) {
                    if (data == null) {
                        return [];
                    }
                    var fData = params.hasFilter() ? $filter(provider.filterFilterName)(data, params.filter(true)) : data;
                    var orderBy = params.orderBy();
                    var orderedData = orderBy.length ? $filter(provider.sortingFilterName)(fData, orderBy) : fData;
                    var pagedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(orderedData.length);
                    return pagedData;
                }
            }
        }]);
});
define('modules/ngtable/providers/ngTableFilterConfig', ['modules/ngtable/providers'], function (module) {
    'use strict';
    module.provider('modules.ngtable.providers.ngTableFilterConfig', [function () {
            var config;
            var defaultConfig = {
                defaultBaseUrl: 'ng-table/filters/',
                defaultExt: '.html',
                aliasUrls: {}
            };
            this.$get = ngTableFilterConfig;
            this.resetConfigs = resetConfigs;
            this.setConfig = setConfig;
            init();
            function init() {
                resetConfigs();
            }
            function resetConfigs() {
                config = defaultConfig;
            }
            function setConfig(customConfig) {
                var mergeConfig = angular.extend({}, config, customConfig);
                mergeConfig.aliasUrls = angular.extend({}, config.aliasUrls, customConfig.aliasUrls);
                config = mergeConfig;
            }
            ngTableFilterConfig.$inject = [];
            function ngTableFilterConfig() {
                var publicConfig;
                var service = {
                    config: publicConfig,
                    getTemplateUrl: getTemplateUrl,
                    getUrlForAlias: getUrlForAlias
                };
                Object.defineProperty(service, 'config', {
                    get: function () {
                        return publicConfig = publicConfig || angular.copy(config);
                    },
                    enumerable: true
                });
                return service;
                function getTemplateUrl(filterValue, filterKey) {
                    if (filterValue.indexOf('/') !== -1) {
                        return filterValue;
                    }
                    return service.getUrlForAlias(filterValue, filterKey);
                }
                function getUrlForAlias(aliasName) {
                    return config.aliasUrls[aliasName] || config.defaultBaseUrl + aliasName + config.defaultExt;
                }
            }
        }]);
});
define('modules/ngtable/factories', ['app/application'], function (application) {
    'use strict';
    return angular.module('modules.ngtable.factories', []);
});
define('modules/ngtable/factories/ngTableColumn', ['modules/ngtable/factories'], function (module) {
    'use strict';
    module.factory('modules.ngtable.factories.ngTableColumn', [function () {
            var defaults = {
                'class': function () {
                    return '';
                },
                filter: function () {
                    return false;
                },
                filterData: angular.noop,
                headerTemplateURL: function () {
                    return false;
                },
                headerTitle: function () {
                    return '';
                },
                sortable: function () {
                    return false;
                },
                show: function () {
                    return true;
                },
                title: function () {
                    return '';
                },
                titleAlt: function () {
                    return '';
                }
            };
            function buildColumn(column, defaultScope) {
                var extendedCol = Object.create(column);
                for (var prop in defaults) {
                    if (extendedCol[prop] === undefined) {
                        extendedCol[prop] = defaults[prop];
                    }
                    if (!angular.isFunction(extendedCol[prop])) {
                        (function (prop1) {
                            extendedCol[prop1] = function () {
                                return column[prop1];
                            };
                        }(prop));
                    }
                    (function (prop1) {
                        var getterFn = extendedCol[prop1];
                        extendedCol[prop1] = function () {
                            if (arguments.length === 0) {
                                return getterFn.call(column, defaultScope);
                            } else {
                                return getterFn.apply(column, arguments);
                            }
                        };
                    }(prop));
                }
                return extendedCol;
            }
            return { buildColumn: buildColumn };
        }]);
});
define('modules/ngtable/factories/ngTableEventsChannel', ['modules/ngtable/factories'], function (module) {
    'use strict';
    module.factory('modules.ngtable.factories.ngTableEventsChannel', [
        '$rootScope',
        function ($rootScope) {
            var events = {};
            events = addChangeEvent('afterCreated', events);
            events = addChangeEvent('afterReloadData', events);
            events = addChangeEvent('datasetChanged', events);
            events = addChangeEvent('pagesChanged', events);
            return events;
            function addChangeEvent(eventName, target) {
                var fnName = eventName.charAt(0).toUpperCase() + eventName.substring(1);
                var event = {};
                event['on' + fnName] = createEventSubscriptionFn(eventName);
                event['publish' + fnName] = createPublishEventFn(eventName);
                return angular.extend(target, event);
            }
            function createEventSubscriptionFn(eventName) {
                return function subscription(handler) {
                    var eventSelector = angular.identity;
                    var scope = $rootScope;
                    if (arguments.length === 2) {
                        if (angular.isFunction(arguments[1].$new)) {
                            scope = arguments[1];
                        } else {
                            eventSelector = arguments[1];
                        }
                    } else if (arguments.length > 2) {
                        scope = arguments[1];
                        eventSelector = arguments[2];
                    }
                    if (angular.isObject(eventSelector)) {
                        var requiredPublisher = eventSelector;
                        eventSelector = function (publisher) {
                            return publisher === requiredPublisher;
                        };
                    }
                    return scope.$on('ngTable:' + eventName, function (event, params) {
                        if (params.isNullInstance)
                            return;
                        var eventArgs = rest(arguments, 2);
                        var fnArgs = [params].concat(eventArgs);
                        if (eventSelector.apply(this, fnArgs)) {
                            handler.apply(this, fnArgs);
                        }
                    });
                };
            }
            function createPublishEventFn(eventName) {
                return function publish() {
                    var fnArgs = ['ngTable:' + eventName].concat(Array.prototype.slice.call(arguments));
                    $rootScope.$broadcast.apply($rootScope, fnArgs);
                };
            }
            function rest(array, n) {
                return Array.prototype.slice.call(array, n == null ? 1 : n);
            }
        }
    ]);
});
define('modules/ngtable/factories/ngTableGetDataBcShim', ['modules/ngtable/factories'], function (module) {
    'use strict';
    module.factory('modules.ngtable.factories.ngTableGetDataBcShim', [
        '$q',
        function ($q) {
            return createWrapper;
            function createWrapper(getDataFn) {
                return function getDataShim() {
                    var $defer = $q.defer();
                    var pData = getDataFn.apply(this, [$defer].concat(Array.prototype.slice.call(arguments)));
                    if (!pData) {
                        pData = $defer.promise;
                    }
                    return pData;
                };
            }
        }
    ]);
});
define('modules/ngtable/factories/NgTableParams', ['modules/ngtable/factories'], function (module) {
    'use strict';
    module.factory('modules.ngtable.factories.NgTableParams', [
        '$q',
        '$log',
        'modules.ngtable.configs.ngTableDefaults',
        'modules.ngtable.factories.ngTableGetDataBcShim',
        'modules.ngtable.providers.ngTableDefaultGetData',
        'modules.ngtable.factories.ngTableEventsChannel',
        function ($q, $log, ngTableDefaults, ngTableGetDataBcShim, ngTableDefaultGetData, ngTableEventsChannel) {
            var isNumber = function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };
            var NgTableParams = function (baseParameters, baseSettings) {
                if (typeof baseParameters === 'boolean') {
                    this.isNullInstance = true;
                }
                var self = this, committedParams, isCommittedDataset = false, log = function () {
                        if (settings.debugMode && $log.debug) {
                            $log.debug.apply(this, arguments);
                        }
                    };
                this.data = [];
                this.parameters = function (newParameters, parseParamsFromUrl) {
                    parseParamsFromUrl = parseParamsFromUrl || false;
                    if (angular.isDefined(newParameters)) {
                        for (var key in newParameters) {
                            var value = newParameters[key];
                            if (parseParamsFromUrl && key.indexOf('[') >= 0) {
                                var keys = key.split(/\[(.*)\]/).reverse();
                                var lastKey = '';
                                for (var i = 0, len = keys.length; i < len; i++) {
                                    var name = keys[i];
                                    if (name !== '') {
                                        var v = value;
                                        value = {};
                                        value[lastKey = name] = isNumber(v) ? parseFloat(v) : v;
                                    }
                                }
                                if (lastKey === 'sorting') {
                                    params[lastKey] = {};
                                }
                                params[lastKey] = angular.extend(params[lastKey] || {}, value[lastKey]);
                            } else {
                                params[key] = isNumber(newParameters[key]) ? parseFloat(newParameters[key]) : newParameters[key];
                            }
                        }
                        log('ngTable: set parameters', params);
                        return this;
                    }
                    return params;
                };
                this.settings = function (newSettings) {
                    if (angular.isDefined(newSettings)) {
                        if (angular.isArray(newSettings.data)) {
                            newSettings.total = newSettings.data.length;
                        }
                        if (newSettings.getData && newSettings.getData.length > 1) {
                            newSettings.getDataFnAdaptor = ngTableGetDataBcShim;
                        }
                        if (newSettings.getGroups && newSettings.getGroups.length > 2) {
                            newSettings.getGroupsFnAdaptor = ngTableGetDataBcShim;
                        }
                        var originalDataset = settings.data;
                        settings = angular.extend(settings, newSettings);
                        var hasDatasetChanged = newSettings.hasOwnProperty('data') && newSettings.data != originalDataset;
                        if (hasDatasetChanged) {
                            if (isCommittedDataset) {
                                this.page(1);
                            }
                            isCommittedDataset = false;
                            ngTableEventsChannel.publishDatasetChanged(this, newSettings.data, originalDataset);
                        }
                        log('ngTable: set settings', settings);
                        return this;
                    }
                    return settings;
                };
                this.page = function (page) {
                    return angular.isDefined(page) ? this.parameters({ 'page': page }) : params.page;
                };
                this.total = function (total) {
                    return angular.isDefined(total) ? this.settings({ 'total': total }) : settings.total;
                };
                this.count = function (count) {
                    return angular.isDefined(count) ? this.parameters({
                        'count': count,
                        'page': 1
                    }) : params.count;
                };
                this.filter = function (filter) {
                    if (angular.isDefined(filter) && angular.isObject(filter)) {
                        return this.parameters({
                            'filter': filter,
                            'page': 1
                        });
                    } else if (filter === true) {
                        var keys = Object.keys(params.filter);
                        var significantFilter = {};
                        for (var i = 0; i < keys.length; i++) {
                            var filterValue = params.filter[keys[i]];
                            if (filterValue != null && filterValue !== '') {
                                significantFilter[keys[i]] = filterValue;
                            }
                        }
                        return significantFilter;
                    } else {
                        return params.filter;
                    }
                };
                this.sorting = function (sorting) {
                    if (arguments.length == 2) {
                        var sortArray = {};
                        sortArray[sorting] = arguments[1];
                        this.parameters({ 'sorting': sortArray });
                        return this;
                    }
                    return angular.isDefined(sorting) ? this.parameters({ 'sorting': sorting }) : params.sorting;
                };
                this.isSortBy = function (field, direction) {
                    if (direction !== undefined) {
                        return angular.isDefined(params.sorting[field]) && params.sorting[field] == direction;
                    } else {
                        return angular.isDefined(params.sorting[field]);
                    }
                };
                this.orderBy = function () {
                    var sorting = [];
                    for (var column in params.sorting) {
                        sorting.push((params.sorting[column] === 'asc' ? '+' : '-') + column);
                    }
                    return sorting;
                };
                this.getData = function (params) {
                    return ngTableDefaultGetData(this.data, params);
                };
                this.getGroups = function (column) {
                    return runGetData().then(function (data) {
                        var groups = {};
                        angular.forEach(data, function (item) {
                            var groupName = angular.isFunction(column) ? column(item) : item[column];
                            groups[groupName] = groups[groupName] || { data: [] };
                            groups[groupName]['value'] = groupName;
                            groups[groupName].data.push(item);
                        });
                        var result = [];
                        for (var i in groups) {
                            result.push(groups[i]);
                        }
                        log('ngTable: refresh groups', result);
                        return result;
                    });
                };
                this.generatePagesArray = function (currentPage, totalItems, pageSize, maxBlocks) {
                    if (!arguments.length) {
                        currentPage = this.page();
                        totalItems = this.total();
                        pageSize = this.count();
                    }
                    var maxPage, maxPivotPages, minPage, numPages, pages;
                    maxBlocks = maxBlocks && maxBlocks < 6 ? 6 : maxBlocks;
                    pages = [];
                    numPages = Math.ceil(totalItems / pageSize);
                    if (numPages > 1) {
                        pages.push({
                            type: 'prev',
                            number: Math.max(1, currentPage - 1),
                            active: currentPage > 1
                        });
                        pages.push({
                            type: 'first',
                            number: 1,
                            active: currentPage > 1,
                            current: currentPage === 1
                        });
                        maxPivotPages = Math.round((settings.paginationMaxBlocks - settings.paginationMinBlocks) / 2);
                        minPage = Math.max(2, currentPage - maxPivotPages);
                        maxPage = Math.min(numPages - 1, currentPage + maxPivotPages * 2 - (currentPage - minPage));
                        minPage = Math.max(2, minPage - (maxPivotPages * 2 - (maxPage - minPage)));
                        var i = minPage;
                        while (i <= maxPage) {
                            if (i === minPage && i !== 2 || i === maxPage && i !== numPages - 1) {
                                pages.push({
                                    type: 'more',
                                    active: false
                                });
                            } else {
                                pages.push({
                                    type: 'page',
                                    number: i,
                                    active: currentPage !== i,
                                    current: currentPage === i
                                });
                            }
                            i++;
                        }
                        pages.push({
                            type: 'last',
                            number: numPages,
                            active: currentPage !== numPages,
                            current: currentPage === numPages
                        });
                        pages.push({
                            type: 'next',
                            number: Math.min(numPages, currentPage + 1),
                            active: currentPage < numPages
                        });
                    }
                    return pages;
                };
                this.isDataReloadRequired = function () {
                    return !isCommittedDataset || !angular.equals(params, committedParams);
                };
                this.hasFilter = function () {
                    return Object.keys(this.filter(true)).length > 0;
                };
                this.hasFilterChanges = function () {
                    return !angular.equals(params && params.filter, committedParams && committedParams.filter);
                };
                this.url = function (asString) {
                    asString = asString || false;
                    var pairs = asString ? [] : {};
                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            var item = params[key], name = encodeURIComponent(key);
                            if (typeof item === 'object') {
                                for (var subkey in item) {
                                    if (!angular.isUndefined(item[subkey]) && item[subkey] !== '') {
                                        var pname = name + '[' + encodeURIComponent(subkey) + ']';
                                        if (asString) {
                                            pairs.push(pname + '=' + item[subkey]);
                                        } else {
                                            pairs[pname] = item[subkey];
                                        }
                                    }
                                }
                            } else if (!angular.isFunction(item) && !angular.isUndefined(item) && item !== '') {
                                if (asString) {
                                    pairs.push(name + '=' + encodeURIComponent(item));
                                } else {
                                    pairs[name] = encodeURIComponent(item);
                                }
                            }
                        }
                    }
                    return pairs;
                };
                this.reload = function () {
                    var self = this, pData = null;
                    settings.$loading = true;
                    committedParams = angular.copy(params);
                    isCommittedDataset = true;
                    if (settings.groupBy) {
                        pData = runInterceptorPipeline(runGetGroups);
                    } else {
                        pData = runInterceptorPipeline(runGetData);
                    }
                    log('ngTable: reload data');
                    var oldData = self.data;
                    return pData.then(function (data) {
                        settings.$loading = false;
                        self.data = data;
                        ngTableEventsChannel.publishAfterReloadData(self, data, oldData);
                        self.reloadPages();
                        if (settings.$scope) {
                            settings.$scope.$emit('ngTableAfterReloadData');
                        }
                        return data;
                    })['catch'](function (reason) {
                        committedParams = null;
                        isCommittedDataset = false;
                        return $q.reject(reason);
                    });
                };
                this.reloadPages = function () {
                    var currentPages;
                    return function () {
                        var oldPages = currentPages;
                        var newPages = self.generatePagesArray(self.page(), self.total(), self.count());
                        if (!angular.equals(oldPages, newPages)) {
                            currentPages = newPages;
                            ngTableEventsChannel.publishPagesChanged(this, newPages, oldPages);
                        }
                    };
                }();
                function runGetData() {
                    var getDataFn = settings.getDataFnAdaptor(settings.getData);
                    return $q.when(getDataFn.call(settings, self));
                }
                function runGetGroups() {
                    var getGroupsFn = settings.getGroupsFnAdaptor(settings.getGroups);
                    return $q.when(getGroupsFn.call(settings, settings.groupBy, self));
                }
                function runInterceptorPipeline(fetchFn) {
                    var interceptors = settings.interceptors || [];
                    return interceptors.reduce(function (result, interceptor) {
                        var thenFn = interceptor.response && interceptor.response.bind(interceptor) || $q.when;
                        var rejectFn = interceptor.responseError && interceptor.responseError.bind(interceptor) || $q.reject;
                        return result.then(function (data) {
                            return thenFn(data, self);
                        }, function (reason) {
                            return rejectFn(reason, self);
                        });
                    }, fetchFn());
                }
                var params = {
                    page: 1,
                    count: 1,
                    filter: {},
                    sorting: {},
                    group: {},
                    groupBy: null
                };
                angular.extend(params, ngTableDefaults.params);
                var settings = {
                    $scope: null,
                    $loading: false,
                    data: null,
                    total: 0,
                    defaultSort: 'desc',
                    filterDelay: 750,
                    counts: [
                        10,
                        25,
                        50,
                        100
                    ],
                    interceptors: [],
                    paginationMaxBlocks: 11,
                    paginationMinBlocks: 5,
                    sortingIndicator: 'span',
                    getDataFnAdaptor: angular.identity,
                    getGroupsFnAdaptor: angular.identity,
                    getGroups: this.getGroups,
                    getData: this.getData
                };
                this.settings(ngTableDefaults.settings);
                this.settings(baseSettings);
                this.parameters(baseParameters, true);
                ngTableEventsChannel.publishAfterCreated(this);
                return this;
            };
            return NgTableParams;
        }
    ]);
});
define('modules/ngtable/directives', ['app/application'], function (application) {
    'use strict';
    return angular.module('modules.ngtable.directives', []);
});
define('modules/ngtable/directives/ngTable', ['modules/ngtable/directives'], function (module) {
    'use strict';
    module.directive('ngTable', [
        '$q',
        '$parse',
        function ($q, $parse) {
            return {
                restrict: 'A',
                priority: 1001,
                scope: true,
                controller: 'modules.ngtable.controllers.ngTableController',
                compile: function (element) {
                    var columns = [], i = 0, row = null;
                    angular.forEach(angular.element(element.find('tr')), function (tr) {
                        tr = angular.element(tr);
                        if (!tr.hasClass('ng-table-group') && !row) {
                            row = tr;
                        }
                    });
                    if (!row) {
                        return;
                    }
                    angular.forEach(row.find('td'), function (item) {
                        var el = angular.element(item);
                        if (el.attr('ignore-cell') && 'true' === el.attr('ignore-cell')) {
                            return;
                        }
                        var getAttrValue = function (attr) {
                            return el.attr('x-data-' + attr) || el.attr('data-' + attr) || el.attr(attr);
                        };
                        var parsedAttribute = function (attr) {
                            var expr = getAttrValue(attr);
                            if (!expr) {
                                return undefined;
                            }
                            return function (scope, locals) {
                                return $parse(expr)(scope, angular.extend(locals || {}, { $columns: columns }));
                            };
                        };
                        var titleExpr = getAttrValue('title-alt') || getAttrValue('title');
                        if (titleExpr) {
                            el.attr('data-title-text', '{{' + titleExpr + '}}');
                        }
                        columns.push({
                            id: i++,
                            title: parsedAttribute('title'),
                            titleAlt: parsedAttribute('title-alt'),
                            headerTitle: parsedAttribute('header-title'),
                            sortable: parsedAttribute('sortable'),
                            'class': parsedAttribute('header-class'),
                            filter: parsedAttribute('filter'),
                            headerTemplateURL: parsedAttribute('header'),
                            filterData: parsedAttribute('filter-data'),
                            show: el.attr('ng-if') ? function (scope) {
                                return $parse(el.attr('ng-if'))(scope);
                            } : undefined
                        });
                    });
                    return function (scope, element, attrs, controller) {
                        scope.$columns = columns = controller.buildColumns(columns);
                        controller.setupBindingsToInternalScope(attrs.ngTable);
                        controller.loadFilterData(columns);
                        controller.compileDirectiveTemplates();
                    };
                }
            };
        }
    ]);
});
define('modules/ngtable/directives/ngTableDynamic', ['modules/ngtable/directives'], function (module) {
    'use strict';
    module.directive('ngTableDynamic', [
        '$parse',
        function ($parse) {
            return {
                restrict: 'A',
                priority: 1001,
                scope: true,
                controller: 'modules.ngtable.controllers.ngTableController',
                compile: function (tElement) {
                    var row;
                    angular.forEach(angular.element(tElement.find('tr')), function (tr) {
                        tr = angular.element(tr);
                        if (!tr.hasClass('ng-table-group') && !row) {
                            row = tr;
                        }
                    });
                    if (!row) {
                        return;
                    }
                    angular.forEach(row.find('td'), function (item) {
                        var el = angular.element(item);
                        var getAttrValue = function (attr) {
                            return el.attr('x-data-' + attr) || el.attr('data-' + attr) || el.attr(attr);
                        };
                        var titleExpr = getAttrValue('title');
                        if (!titleExpr) {
                            el.attr('data-title-text', '{{$columns[$index].titleAlt(this) || $columns[$index].title(this)}}');
                        }
                        var showExpr = el.attr('ng-if');
                        if (!showExpr) {
                            el.attr('ng-if', '$columns[$index].show(this)');
                        }
                    });
                    return function (scope, element, attrs, controller) {
                        var expr = controller.parseNgTableDynamicExpr(attrs.ngTableDynamic);
                        controller.setupBindingsToInternalScope(expr.tableParams);
                        controller.compileDirectiveTemplates();
                        scope.$watchCollection(expr.columns, function (newCols) {
                            scope.$columns = controller.buildColumns(newCols);
                            controller.loadFilterData(scope.$columns);
                        });
                    };
                }
            };
        }
    ]);
});
define('modules/ngtable/directives/ngTableFilterRow', ['modules/ngtable/directives'], function (module) {
    'use strict';
    module.directive('ngTableFilterRow', [function () {
            var directive = {
                restrict: 'E',
                replace: true,
                templateUrl: 'ng-table/filterRow.html',
                scope: true,
                controller: 'modules.ngtable.controllers.ngTableFilterRowController'
            };
            return directive;
        }]);
});
define('modules/ngtable/directives/ngTablePagination', ['modules/ngtable/directives'], function (module) {
    'use strict';
    module.directive('ngTablePagination', [
        '$compile',
        'modules.ngtable.factories.ngTableEventsChannel',
        function ($compile, ngTableEventsChannel) {
            'use strict';
            return {
                restrict: 'A',
                scope: {
                    'params': '=ngTablePagination',
                    'templateUrl': '='
                },
                replace: false,
                link: function (scope, element) {
                    ngTableEventsChannel.onAfterReloadData(function (pubParams) {
                        scope.pages = pubParams.generatePagesArray();
                    }, scope, function (pubParams) {
                        return pubParams === scope.params;
                    });
                    scope.$watch('templateUrl', function (templateUrl) {
                        if (angular.isUndefined(templateUrl)) {
                            return;
                        }
                        var template = angular.element(document.createElement('div'));
                        template.attr({ 'ng-include': 'templateUrl' });
                        element.append(template);
                        $compile(template)(scope);
                    });
                }
            };
        }
    ]);
});
define('modules/ngtable/directives/ngTableSorterRow', ['modules/ngtable/directives'], function (module) {
    'use strict';
    module.directive('ngTableSorterRow', [function ngTableSorterRow() {
            var directive = {
                restrict: 'E',
                replace: true,
                templateUrl: 'ng-table/sorterRow.html',
                scope: true,
                controller: 'modules.ngtable.controllers.ngTableSorterRowController'
            };
            return directive;
        }]);
});
define('modules/ngtable/controllers', ['app/application'], function (application) {
    'use strict';
    return angular.module('modules.ngtable.controllers', []);
});
define('modules/ngtable/controllers/ngTableController', ['modules/ngtable/controllers'], function (module) {
    'use strict';
    module.controller('modules.ngtable.controllers.ngTableController', [
        '$scope',
        'modules.ngtable.factories.NgTableParams',
        '$timeout',
        '$parse',
        '$compile',
        '$attrs',
        '$element',
        'modules.ngtable.factories.ngTableColumn',
        'modules.ngtable.factories.ngTableEventsChannel',
        function ($scope, NgTableParams, $timeout, $parse, $compile, $attrs, $element, ngTableColumn, ngTableEventsChannel) {
            var isFirstTimeLoad = true;
            $scope.$filterRow = {};
            $scope.$loading = false;
            if (!$scope.hasOwnProperty('params')) {
                $scope.params = new NgTableParams(true);
            }
            $scope.params.settings().$scope = $scope;
            var delayFilter = function () {
                var timer = 0;
                return function (callback, ms) {
                    $timeout.cancel(timer);
                    timer = $timeout(callback, ms);
                };
            }();
            function onDataReloadStatusChange(newStatus) {
                if (!newStatus) {
                    return;
                }
                $scope.params.settings().$scope = $scope;
                var currentParams = $scope.params;
                if (currentParams.hasFilterChanges()) {
                    var applyFilter = function () {
                        currentParams.page(1);
                        currentParams.reload();
                    };
                    if (currentParams.settings().filterDelay) {
                        delayFilter(applyFilter, currentParams.settings().filterDelay);
                    } else {
                        applyFilter();
                    }
                } else {
                    currentParams.reload();
                }
            }
            $scope.$watch('params', function (newParams, oldParams) {
                if (newParams === oldParams || !newParams) {
                    return;
                }
                newParams.reload();
            }, false);
            $scope.$watch('params.isDataReloadRequired()', onDataReloadStatusChange);
            this.compileDirectiveTemplates = function () {
                if (!$element.hasClass('ng-table')) {
                    $scope.templates = {
                        header: $attrs.templateHeader ? $attrs.templateHeader : 'ng-table/header.html',
                        pagination: $attrs.templatePagination ? $attrs.templatePagination : 'ng-table/pager.html'
                    };
                    $element.addClass('ng-table');
                    var headerTemplate = null;
                    var theadFound = false;
                    angular.forEach($element.children(), function (e) {
                        if (e.tagName === 'THEAD') {
                            theadFound = true;
                        }
                    });
                    if (!theadFound) {
                        headerTemplate = angular.element(document.createElement('thead')).attr('ng-include', 'templates.header');
                        $element.prepend(headerTemplate);
                    }
                    var paginationTemplate = angular.element(document.createElement('div')).attr({
                        'ng-table-pagination': 'params',
                        'template-url': 'templates.pagination'
                    });
                    $element.after(paginationTemplate);
                    if (headerTemplate) {
                        $compile(headerTemplate)($scope);
                    }
                    $compile(paginationTemplate)($scope);
                }
            };
            this.loadFilterData = function ($columns) {
                angular.forEach($columns, function ($column) {
                    var def;
                    def = $column.filterData($scope, { $column: $column });
                    if (!def) {
                        delete $column.filterData;
                        return;
                    }
                    if (angular.isObject(def) && angular.isObject(def.promise)) {
                        delete $column.filterData;
                        return def.promise.then(function (data) {
                            if (!angular.isArray(data) && !angular.isFunction(data) && !angular.isObject(data)) {
                                data = [];
                            } else if (angular.isArray(data)) {
                                data.unshift({
                                    title: '',
                                    id: ''
                                });
                            }
                            $column.data = data;
                        });
                    } else {
                        return $column.data = def;
                    }
                });
            };
            this.buildColumns = function (columns) {
                return columns.map(function (col) {
                    return ngTableColumn.buildColumn(col, $scope);
                });
            };
            this.parseNgTableDynamicExpr = function (attr) {
                if (!attr || attr.indexOf(' with ') > -1) {
                    var parts = attr.split(/\s+with\s+/);
                    return {
                        tableParams: parts[0],
                        columns: parts[1]
                    };
                } else {
                    throw new Error('Parse error (expected example: ng-table-dynamic=\'tableParams with cols\')');
                }
            };
            this.setupBindingsToInternalScope = function (tableParamsExpr) {
                var tableParamsGetter = $parse(tableParamsExpr);
                $scope.$watch(tableParamsGetter, function (params) {
                    if (angular.isUndefined(params)) {
                        return;
                    }
                    $scope.paramsModel = tableParamsGetter;
                    $scope.params = params;
                }, false);
                if ($attrs.showFilter) {
                    $scope.$parent.$watch($attrs.showFilter, function (value) {
                        $scope.show_filter = value;
                    });
                }
                if ($attrs.disableFilter) {
                    $scope.$parent.$watch($attrs.disableFilter, function (value) {
                        $scope.$filterRow.disabled = value;
                    });
                }
            };
            function commonInit() {
                ngTableEventsChannel.onAfterReloadData(bindDataToScope, $scope, isMyPublisher);
                ngTableEventsChannel.onPagesChanged(bindPagesToScope, $scope, isMyPublisher);
                function bindDataToScope(params, newDatapage) {
                    if (params.settings().groupBy) {
                        $scope.$groups = newDatapage;
                    } else {
                        $scope.$data = newDatapage;
                    }
                }
                function bindPagesToScope(params, newPages) {
                    $scope.pages = newPages;
                }
                function isMyPublisher(publisher) {
                    return $scope.params === publisher;
                }
            }
            commonInit();
        }
    ]);
});
define('modules/ngtable/controllers/ngTableFilterRowController', ['modules/ngtable/controllers'], function (module) {
    'use strict';
    module.controller('modules.ngtable.controllers.ngTableFilterRowController', [
        '$scope',
        'modules.ngtable.providers.ngTableFilterConfig',
        function ($scope, ngTableFilterConfig) {
            $scope.config = ngTableFilterConfig;
        }
    ]);
});
define('modules/ngtable/controllers/ngTableSorterRowController', ['modules/ngtable/controllers'], function (module) {
    'use strict';
    module.controller('modules.ngtable.controllers.ngTableSorterRowController', [
        '$scope',
        function ($scope) {
            $scope.sortBy = sortBy;
            function sortBy($column, event) {
                var parsedSortable = $column.sortable && $column.sortable();
                if (!parsedSortable) {
                    return;
                }
                var defaultSort = $scope.params.settings().defaultSort;
                var inverseSort = defaultSort === 'asc' ? 'desc' : 'asc';
                var sorting = $scope.params.sorting() && $scope.params.sorting()[parsedSortable] && $scope.params.sorting()[parsedSortable] === defaultSort;
                var sortingParams = event.ctrlKey || event.metaKey ? $scope.params.sorting() : {};
                sortingParams[parsedSortable] = sorting ? inverseSort : defaultSort;
                $scope.params.parameters({ sorting: sortingParams });
            }
        }
    ]);
});
define('modules/ngtable/module', [
    'app/application',
    'modules/ngtable/configs/ngTableDefaults',
    'modules/ngtable/providers/ngTableDefaultGetData',
    'modules/ngtable/providers/ngTableFilterConfig',
    'modules/ngtable/factories/ngTableColumn',
    'modules/ngtable/factories/ngTableEventsChannel',
    'modules/ngtable/factories/ngTableGetDataBcShim',
    'modules/ngtable/factories/NgTableParams',
    'modules/ngtable/directives/ngTable',
    'modules/ngtable/directives/ngTableDynamic',
    'modules/ngtable/directives/ngTableFilterRow',
    'modules/ngtable/directives/ngTablePagination',
    'modules/ngtable/directives/ngTableSorterRow',
    'modules/ngtable/controllers/ngTableController',
    'modules/ngtable/controllers/ngTableFilterRowController',
    'modules/ngtable/controllers/ngTableSorterRowController'
], function (application) {
    'use strict';
    application.requires.push('modules.ngtable');
    return angular.module('modules.ngtable', [
        'modules.ngtable.configs',
        'modules.ngtable.providers',
        'modules.ngtable.factories',
        'modules.ngtable.directives',
        'modules.ngtable.controllers'
    ]).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('ng-table/filterRow.html', '<tr ng-show="show_filter" class="ng-table-filters"> <th data-title-text="{{$column.titleAlt(this) || $column.title(this)}}" ng-repeat="$column in $columns" ng-if="$column.show(this)" class="filter"> <div ng-repeat="(name, filter) in $column.filter(this)"> <div ng-include="config.getTemplateUrl(filter)"></div> </div> </th> </tr> ');
            $templateCache.put('ng-table/filters/number.html', '<input type="number" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> ');
            $templateCache.put('ng-table/filters/select-multiple.html', '<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" multiple ng-multiple="true" ng-model="params.filter()[name]" class="filter filter-select-multiple form-control" name="{{name}}"> </select> ');
            $templateCache.put('ng-table/filters/select.html', '<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="filter filter-select form-control" name="{{name}}"> <option style="display:none" value=""></option> </select> ');
            $templateCache.put('ng-table/filters/text.html', '<input type="text" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> ');
            $templateCache.put('ng-table/header.html', '<ng-table-sorter-row></ng-table-sorter-row> <ng-table-filter-row></ng-table-filter-row> ');
            $templateCache.put('ng-table/pager.html', '<div class="ng-cloak ng-table-pager" ng-if="params.data.length"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ');
            $templateCache.put('ng-table/sorterRow.html', '<tr> <th title="{{$column.headerTitle(this)}}" ng-repeat="$column in $columns" ng-class="{ \'sortable\': $column.sortable(this), \'sort-asc\': params.sorting()[$column.sortable(this)]==\'asc\', \'sort-desc\': params.sorting()[$column.sortable(this)]==\'desc\' }" ng-click="sortBy($column, $event)" ng-if="$column.show(this)" ng-init="template=$column.headerTemplateURL(this)" class="header {{$column.class(this)}}"> <div ng-if="!template" class="ng-table-header" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'div\'}"> <span ng-bind="$column.title(this)" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'span\'}"></span> </div> <div ng-if="template" ng-include="template"></div> </th> </tr> ');
        }
    ]);
    ;
});