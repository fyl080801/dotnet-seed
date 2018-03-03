define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/roles', [
    '$scope',
    'SeedModules.AngularUI/ui/factories/ngTableParams',
    function($scope, ngTableParams) {
      $scope.tableParams = new ngTableParams();
    }
  ]);
});
