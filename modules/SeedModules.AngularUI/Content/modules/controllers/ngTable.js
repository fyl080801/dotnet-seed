define(["require", "exports", "SeedModules.AngularUI/modules/module", "angular"], function (require, exports, mod, angular) {
    "use strict";
    exports.__esModule = true;
    var NgTableController = (function () {
        function NgTableController($scope, $timeout, $parse, $compile, $attrs, $element, ngTableParams, ngTableColumn, ngTableEventsChannel) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$parse = $parse;
            this.$compile = $compile;
            this.$attrs = $attrs;
            this.$element = $element;
            this.ngTableParams = ngTableParams;
            this.ngTableColumn = ngTableColumn;
            this.ngTableEventsChannel = ngTableEventsChannel;
            var isFirstTimeLoad = true;
            $scope.$filterRow = {};
            $scope.$loading = false;
            if (!$scope.hasOwnProperty('params')) {
                $scope.params = new ngTableParams(true);
            }
            $scope.params.settings().$scope = $scope;
            var delayFilter = (function () {
                var timer = 0;
                return function (callback, ms) {
                    $timeout.cancel(timer);
                    timer = $timeout(callback, ms);
                };
            })();
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
                    }
                    else {
                        applyFilter();
                    }
                }
                else {
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
            function commonInit() {
                ngTableEventsChannel.onAfterReloadData(bindDataToScope, $scope, isMyPublisher);
                ngTableEventsChannel.onPagesChanged(bindPagesToScope, $scope, isMyPublisher);
                function bindDataToScope(params, newDatapage) {
                    if (params.settings().groupBy) {
                        $scope.$groups = newDatapage;
                    }
                    else {
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
        NgTableController.prototype.compileDirectiveTemplates = function () {
            if (!this.$element.hasClass('ng-table')) {
                this.$scope.templates = {
                    header: this.$attrs.templateHeader || 'ng-table/header.html',
                    pagination: this.$attrs.templatePagination || 'ng-table/pager.html'
                };
                this.$element.addClass('ng-table');
                var headerTemplate = null;
                var theadFound = false;
                angular.forEach(this.$element.children(), function (e) {
                    if (e.tagName === 'THEAD') {
                        theadFound = true;
                    }
                });
                if (!theadFound) {
                    headerTemplate = angular
                        .element(document.createElement('thead'))
                        .attr('ng-include', 'templates.header');
                    this.$element.prepend(headerTemplate);
                }
                var paginationTemplate = angular
                    .element(document.createElement('div'))
                    .attr({
                    'ng-table-pagination': 'params',
                    'template-url': 'templates.pagination'
                });
                this.$element.after(paginationTemplate);
                if (headerTemplate) {
                    this.$compile(headerTemplate)(this.$scope);
                }
                this.$compile(paginationTemplate)(this.$scope);
            }
        };
        NgTableController.prototype.buildColumns = function (columns) {
            var self = this;
            return columns.map(function (col) {
                return self.ngTableColumn.buildColumn(col, self.$scope);
            });
        };
        NgTableController.prototype.parseNgTableDynamicExpr = function (attr) {
            if (!attr || attr.indexOf(' with ') > -1) {
                var parts = attr.split(/\s+with\s+/);
                return {
                    tableParams: parts[0],
                    columns: parts[1]
                };
            }
            else {
                throw new Error("转换错误 (示例: ng-table-dynamic='tableParams with cols')");
            }
        };
        NgTableController.prototype.setupBindingsToInternalScope = function (tableParamsExpr) {
            var self = this;
            var tableParamsGetter = this.$parse(tableParamsExpr);
            this.$scope.$watch(tableParamsGetter, function (params) {
                if (angular.isUndefined(params)) {
                    return;
                }
                self.$scope.paramsModel = tableParamsGetter;
                self.$scope.params = params;
            }, false);
            if (this.$attrs.showFilter) {
                this.$scope.$parent.$watch(this.$attrs.showFilter, function (value) {
                    self.$scope.show_filter = value;
                });
            }
            if (this.$attrs.disableFilter) {
                this.$scope.$parent.$watch(this.$attrs.disableFilter, function (value) {
                    self.$scope.$filterRow.disabled = value;
                });
            }
        };
        NgTableController.$inject = [
            '$scope',
            '$timeout',
            '$parse',
            '$compile',
            '$attrs',
            '$element',
            'SeedModules.AngularUI/modules/factories/ngTableParams',
            'SeedModules.AngularUI/modules/factories/ngTableColumn',
            'SeedModules.AngularUI/modules/factories/ngTableEventsChannel'
        ];
        return NgTableController;
    }());
    exports.NgTableController = NgTableController;
    mod.controller('SeedModules.AngularUI/modules/controllers/ngTable', NgTableController);
});
//# sourceMappingURL=ngTable.js.map