define(["require", "exports", "SeedModules.AngularUI/modules/module", "angular", "SeedModules.AngularUI/modules/controllers/ngTable"], function (require, exports, mod, angular, ngTable_1) {
    "use strict";
    exports.__esModule = true;
    function ngTableDynamicDirective($parse) {
        return {
            restrict: 'A',
            priority: 1001,
            scope: true,
            controller: ngTable_1.NgTableController,
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
                        return (el.attr('x-data-' + attr) ||
                            el.attr('data-' + attr) ||
                            el.attr(attr));
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
                    });
                };
            }
        };
    }
    ngTableDynamicDirective.$inject = ['$parse'];
    mod.directive('ngTableDynamic', ngTableDynamicDirective);
});
