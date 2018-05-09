define(['SeedModules.AngularUI/modules/module'], function(module) {
  'use strict';

  module.directive('ngTableSorterRow', [
    function ngTableSorterRow() {
      var directive = {
        restrict: 'E',
        replace: true,
        templateUrl: 'ng-table/sorterRow.html',
        scope: true,
        controller: 'SeedModules.AngularUI/modules/controllers/ngTableSorterRow'
      };
      return directive;
    }
  ]);
});
