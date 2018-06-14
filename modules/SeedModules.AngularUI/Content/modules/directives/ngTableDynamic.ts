import mod = require('SeedModules.AngularUI/modules/module');
import angular = require('angular');
import { NgTableController } from 'SeedModules.AngularUI/modules/controllers/ngTable';

interface INgTableCompileScope extends ng.IScope {
  $columns: any[];
}

function ngTableDynamicDirective($parse): ng.IDirective {
  return {
    restrict: 'A',
    priority: 1001,
    scope: true,
    controller: NgTableController,
    compile: tElement => {
      var row;

      // IE 8 fix :not(.ng-table-group) selector
      angular.forEach(
        angular.element(tElement.find('tr')),
        (tr: JQuery<HTMLElement>) => {
          tr = angular.element(tr);
          if (!tr.hasClass('ng-table-group') && !row) {
            row = tr;
          }
        }
      );
      if (!row) {
        return;
      }

      angular.forEach(row.find('td'), item => {
        var el = angular.element(item);
        var getAttrValue = attr => {
          return (
            el.attr('x-data-' + attr) ||
            el.attr('data-' + attr) ||
            el.attr(attr)
          );
        };

        // this used in responsive table
        var titleExpr = getAttrValue('title');
        if (!titleExpr) {
          el.attr(
            'data-title-text',
            '{{$columns[$index].titleAlt(this) || $columns[$index].title(this)}}'
          );
        }
        var showExpr = el.attr('ng-if');
        if (!showExpr) {
          el.attr('ng-if', '$columns[$index].show(this)');
        }
      });
      return (
        scope: INgTableCompileScope,
        element: JQLite,
        attrs: ng.IAttributes,
        controller: NgTableController
      ) => {
        var expr = controller.parseNgTableDynamicExpr(attrs.ngTableDynamic);

        controller.setupBindingsToInternalScope(expr.tableParams);
        controller.compileDirectiveTemplates();

        scope.$watchCollection(expr.columns, function(newCols /*, oldCols*/) {
          scope.$columns = controller.buildColumns(newCols);
        });
      };
    }
  };
}

ngTableDynamicDirective.$inject = ['$parse'];

mod.directive('ngTableDynamic', ngTableDynamicDirective);
