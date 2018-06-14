import mod = require('SeedModules.AngularUI/modules/module');
import angular = require('angular');

export class NgTableController {
  compileDirectiveTemplates() {
    if (!this.$element.hasClass('ng-table')) {
      this.$scope.templates = {
        header: this.$attrs.templateHeader || 'ng-table/header.html',
        pagination: this.$attrs.templatePagination || 'ng-table/pager.html'
      };
      this.$element.addClass('ng-table');
      var headerTemplate = null;

      // $element.find('> thead').length === 0 doesn't work on jqlite
      var theadFound = false;
      angular.forEach(this.$element.children(), e => {
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
  }

  buildColumns(columns) {
    var self = this;
    return columns.map(col => {
      return self.ngTableColumn.buildColumn(col, self.$scope);
    });
  }

  parseNgTableDynamicExpr(attr) {
    if (!attr || attr.indexOf(' with ') > -1) {
      var parts = attr.split(/\s+with\s+/);
      return {
        tableParams: parts[0],
        columns: parts[1]
      };
    } else {
      throw new Error(
        "转换错误 (示例: ng-table-dynamic='tableParams with cols')"
      );
    }
  }

  setupBindingsToInternalScope(tableParamsExpr) {
    // note: this we're setting up watches to simulate angular's isolated scope bindings

    // note: is REALLY important to watch for a change to the ngTableParams *reference* rather than
    // $watch for value equivalence. This is because ngTableParams references the current page of data as
    // a field and it's important not to watch this
    var self = this;
    var tableParamsGetter = this.$parse(tableParamsExpr);
    this.$scope.$watch(
      tableParamsGetter,
      params => {
        if (angular.isUndefined(params)) {
          return;
        }
        self.$scope.paramsModel = tableParamsGetter;
        self.$scope.params = params;
      },
      false
    );

    if (this.$attrs.showFilter) {
      this.$scope.$parent.$watch(this.$attrs.showFilter, value => {
        self.$scope.show_filter = value;
      });
    }
    if (this.$attrs.disableFilter) {
      this.$scope.$parent.$watch(this.$attrs.disableFilter, value => {
        self.$scope.$filterRow.disabled = value;
      });
    }
  }

  static $inject = [
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
  constructor(
    private $scope,
    private $timeout,
    private $parse: ng.IParseService,
    private $compile: ng.ICompileService,
    private $attrs: ng.IAttributes,
    private $element: JQLite,
    private ngTableParams,
    private ngTableColumn,
    private ngTableEventsChannel
  ) {
    var isFirstTimeLoad = true;
    $scope.$filterRow = {};
    $scope.$loading = false;

    // until such times as the directive uses an isolated scope, we need to ensure that the check for
    // the params field only consults the "own properties" of the $scope. This is to avoid seeing the params
    // field on a $scope higher up in the prototype chain
    if (!$scope.hasOwnProperty('params')) {
      $scope.params = new ngTableParams(true);
    }
    $scope.params.settings().$scope = $scope;

    var delayFilter = (function() {
      var timer = 0;
      return function(callback, ms) {
        $timeout.cancel(timer);
        timer = $timeout(callback, ms);
      };
    })();

    function onDataReloadStatusChange(newStatus /*, oldStatus*/) {
      if (!newStatus) {
        return;
      }

      $scope.params.settings().$scope = $scope;

      var currentParams = $scope.params;

      if (currentParams.hasFilterChanges()) {
        var applyFilter = function() {
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

    // watch for when a new ngTableParams is bound to the scope
    // CRITICAL: the watch must be for reference and NOT value equality; this is because ngTableParams maintains
    // the current data page as a field. Checking this for value equality would be terrible for performance
    // and potentially cause an error if the items in that array has circular references
    $scope.$watch(
      'params',
      function(newParams, oldParams) {
        if (newParams === oldParams || !newParams) {
          return;
        }

        newParams.reload();
      },
      false
    );

    $scope.$watch('params.isDataReloadRequired()', onDataReloadStatusChange);

    function commonInit() {
      ngTableEventsChannel.onAfterReloadData(
        bindDataToScope,
        $scope,
        isMyPublisher
      );
      ngTableEventsChannel.onPagesChanged(
        bindPagesToScope,
        $scope,
        isMyPublisher
      );

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
}

mod.controller(
  'SeedModules.AngularUI/modules/controllers/ngTable',
  NgTableController
);
