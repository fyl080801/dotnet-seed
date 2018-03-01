define(['SeedModules.AngularUI/ui/module'], function(module) {
  'use strict';

  module.directive('ngTable', [
    '$q',
    '$parse',
    function($q, $parse) {
      return {
        restrict: 'A',
        priority: 1001,
        scope: true,
        controller: 'SeedModules.AngularUI/ui/controllers/ngTable',
        compile: function(element) {
          var columns = [],
            i = 0,
            row = null;

          // IE 8 fix :not(.ng-table-group) selector
          angular.forEach(angular.element(element.find('tr')), function(tr) {
            tr = angular.element(tr);
            if (!tr.hasClass('ng-table-group') && !row) {
              row = tr;
            }
          });
          if (!row) {
            return;
          }
          angular.forEach(row.find('td'), function(item) {
            var el = angular.element(item);
            if (el.attr('ignore-cell') && 'true' === el.attr('ignore-cell')) {
              return;
            }

            var getAttrValue = function(attr) {
              return (
                el.attr('x-data-' + attr) ||
                el.attr('data-' + attr) ||
                el.attr(attr)
              );
            };

            var parsedAttribute = function(attr) {
              var expr = getAttrValue(attr);
              if (!expr) {
                return undefined;
              }
              return function(scope, locals) {
                return $parse(expr)(
                  scope,
                  angular.extend(locals || {}, {
                    $columns: columns
                  })
                );
              };
            };

            var titleExpr = getAttrValue('title-alt') || getAttrValue('title');
            if (titleExpr) {
              el.attr('data-title-text', '{{' + titleExpr + '}}'); // this used in responsive table
            }
            // NOTE TO MAINTAINERS: if you add extra fields to a $column be sure to extend ngTableColumn with
            // a corresponding "safe" default
            columns.push({
              id: i++,
              title: parsedAttribute('title'),
              titleAlt: parsedAttribute('title-alt'),
              headerTitle: parsedAttribute('header-title'),
              sortable: parsedAttribute('sortable'),
              class: parsedAttribute('header-class'),
              headerTemplateURL: parsedAttribute('header'),
              show: (function() {
                if (el.attr('ng-if')) {
                  return function(scope) {
                    return $parse(el.attr('ng-if'))(scope);
                  };
                } else {
                  return undefined;
                }
              })()
            });
          });
          return function(scope, element, attrs, controller) {
            scope.$columns = columns = controller.buildColumns(columns);

            controller.setupBindingsToInternalScope(attrs.ngTable);
            controller.compileDirectiveTemplates();
          };
        }
      };
    }
  ]);
});
