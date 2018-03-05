define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/users', [
    '$scope',
    '$modal',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableParams',
    function($scope, $modal, requestService, ngTableParams) {
      $scope.tableParams = new ngTableParams();

      $scope.list = [];

      $scope.create = function() {};
    }
  ]);
});
