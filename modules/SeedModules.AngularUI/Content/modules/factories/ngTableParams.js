define(["require", "exports", "SeedModules.AngularUI/modules/module", "angular"], function (require, exports, mod, angular) {
    "use strict";
    exports.__esModule = true;
    function ngTableParamsFactory($q, $log, ngTableDefaults, ngTableGetDataBcShim, ngTableDefaultGetData, ngTableEventsChannel) {
        var isNumber = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        var ngTableParams = function (baseParameters, baseSettings) {
            var _this = this;
            if (typeof baseParameters === 'boolean') {
                this.isNullInstance = true;
            }
            var self = this, committedParams, isCommittedDataset = false, log = function (text, settings) {
                if (settings && settings.debugMode && $log.debug) {
                    $log.debug.apply(_this, text);
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
                                    value[(lastKey = name)] = isNumber(v) ? parseFloat(v) : v;
                                }
                            }
                            if (lastKey === 'sorting') {
                                params[lastKey] = {};
                            }
                            params[lastKey] = angular.extend(params[lastKey] || {}, value[lastKey]);
                        }
                        else {
                            params[key] = isNumber(newParameters[key])
                                ? parseFloat(newParameters[key])
                                : newParameters[key];
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
                    var hasDatasetChanged = newSettings.hasOwnProperty('data') &&
                        newSettings.data != originalDataset;
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
                if (angular.isDefined(page)) {
                    return this.parameters({
                        page: page
                    });
                }
                else {
                    return params.page;
                }
            };
            this.total = function (total) {
                if (angular.isDefined(total)) {
                    return this.settings({
                        total: total
                    });
                }
                else {
                    return settings.total;
                }
            };
            this.count = function (count) {
                if (angular.isDefined(count)) {
                    return this.parameters({
                        count: count,
                        page: 1
                    });
                }
                else {
                    return params.count;
                }
            };
            this.filter = function (filter) {
                if (angular.isDefined(filter) && angular.isObject(filter)) {
                    return this.parameters({
                        filter: filter,
                        page: 1
                    });
                }
                else if (filter === true) {
                    var keys = Object.keys(params.filter);
                    var significantFilter = {};
                    for (var i = 0; i < keys.length; i++) {
                        var filterValue = params.filter[keys[i]];
                        if (filterValue != null && filterValue !== '') {
                            significantFilter[keys[i]] = filterValue;
                        }
                    }
                    return significantFilter;
                }
                else {
                    return params.filter;
                }
            };
            this.sorting = function (sorting) {
                if (arguments.length == 2) {
                    var sortArray = {};
                    sortArray[sorting] = arguments[1];
                    this.parameters({
                        sorting: sortArray
                    });
                    return this;
                }
                return angular.isDefined(sorting)
                    ? this.parameters({
                        sorting: sorting
                    })
                    : params.sorting;
            };
            this.isSortBy = function (field, direction) {
                if (direction !== undefined) {
                    return (angular.isDefined(params.sorting[field]) &&
                        params.sorting[field] == direction);
                }
                else {
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
                        var groupName = angular.isFunction(column)
                            ? column(item)
                            : item[column];
                        groups[groupName] = groups[groupName] || {
                            data: []
                        };
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
                        if ((i === minPage && i !== 2) ||
                            (i === maxPage && i !== numPages - 1)) {
                            pages.push({
                                type: 'more',
                                active: false
                            });
                        }
                        else {
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
                                    }
                                    else {
                                        pairs[pname] = item[subkey];
                                    }
                                }
                            }
                        }
                        else if (!angular.isFunction(item) &&
                            !angular.isUndefined(item) &&
                            item !== '') {
                            if (asString) {
                                pairs.push(name + '=' + encodeURIComponent(item));
                            }
                            else {
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
                }
                else {
                    pData = runInterceptorPipeline(runGetData);
                }
                log('ngTable: reload data');
                var oldData = self.data;
                return pData
                    .then(function (data) {
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
            this.reloadPages = (function () {
                var currentPages;
                return function () {
                    var oldPages = currentPages;
                    var newPages = self.generatePagesArray(self.page(), self.total(), self.count());
                    if (!angular.equals(oldPages, newPages)) {
                        currentPages = newPages;
                        ngTableEventsChannel.publishPagesChanged(this, newPages, oldPages);
                    }
                };
            })();
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
                    var thenFn = (interceptor.response && interceptor.response.bind(interceptor)) ||
                        $q.when;
                    var rejectFn = (interceptor.responseError &&
                        interceptor.responseError.bind(interceptor)) ||
                        $q.reject;
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
                counts: [10, 25, 50, 100],
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
        return ngTableParams;
    }
    ngTableParamsFactory.$inject = [
        '$q',
        '$log',
        'SeedModules.AngularUI/modules/configs/ngTableDefaults',
        'SeedModules.AngularUI/modules/factories/ngTableGetDataBcShim',
        'SeedModules.AngularUI/modules/providers/ngTableDefaultGetData',
        'SeedModules.AngularUI/modules/factories/ngTableEventsChannel'
    ];
    mod.factory('SeedModules.AngularUI/modules/factories/ngTableParams', ngTableParamsFactory);
});

//# sourceMappingURL=ngTableParams.js.map
