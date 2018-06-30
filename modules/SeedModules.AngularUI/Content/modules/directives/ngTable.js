define(["require", "exports", "SeedModules.AngularUI/modules/module", "angular", "SeedModules.AngularUI/modules/controllers/ngTable"], function (require, exports, mod, angular, ngTable_1) {
    "use strict";
    exports.__esModule = true;
    function ngTableDirective($q, $parse) {
        return {
            restrict: 'A',
            priority: 1001,
            scope: true,
            controller: ngTable_1.NgTableController,
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
                        return (el.attr('x-data-' + attr) ||
                            el.attr('data-' + attr) ||
                            el.attr(attr));
                    };
                    var parsedAttribute = function (attr) {
                        var expr = getAttrValue(attr);
                        if (!expr) {
                            return undefined;
                        }
                        return function (scope, locals) {
                            return $parse(expr)(scope, angular.extend(locals || {}, {
                                $columns: columns
                            }));
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
                        "class": parsedAttribute('header-class'),
                        headerTemplateURL: parsedAttribute('header'),
                        show: (function () {
                            if (el.attr('ng-if')) {
                                return function (scope) {
                                    return $parse(el.attr('ng-if'))(scope);
                                };
                            }
                            else {
                                return undefined;
                            }
                        })()
                    });
                });
                return function (scope, element, attrs, controller) {
                    scope.$columns = columns = controller.buildColumns(columns);
                    controller.setupBindingsToInternalScope(attrs.ngTable);
                    controller.compileDirectiveTemplates();
                };
            }
        };
    }
    ngTableDirective.$inject = ['$q', '$parse'];
    mod.directive('ngTable', ngTableDirective);
});
