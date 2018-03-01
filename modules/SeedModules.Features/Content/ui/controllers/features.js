define(['SeedModules.Features/ui/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Features/ui/controllers/features', [
    '$scope',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableParams',
    function($scope, requestService, ngTableParams) {
      $scope.list = [];

      $scope.load = function() {
        requestService
          .url('/api/features/query')
          .post()
          .then(function(result) {
            $scope.list = result.list;
          });
      };
    }
  ]);
});
