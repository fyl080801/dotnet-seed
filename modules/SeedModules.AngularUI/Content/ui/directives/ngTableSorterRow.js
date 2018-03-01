define(['SeedModules.AngularUI/ui/module'], function(module) {
  'use strict';

  module.directive('ngTableSorterRow', [
    function ngTableSorterRow() {
      var directive = {
        restrict: 'E',
        replace: true,
        templateUrl: 'ng-table/sorterRow.html',
        scope: true,
        controller: 'SeedModules.AngularUI/ui/controllers/ngTableSorterRow'
      };
      return directive;
    }
  ]);
});
