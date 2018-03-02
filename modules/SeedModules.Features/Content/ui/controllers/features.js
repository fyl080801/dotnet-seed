define(['SeedModules.Features/ui/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Features/ui/controllers/features', [
    '$scope',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableParams',
    function($scope, requestService, ngTableParams) {
      $scope.list = [];

      $scope.setEnable = function(feature, enabled) {
        if (enabled !== undefined) {
          feature.enabled = enabled;
        }
        requestService
          .url('/api/features/' + feature.descriptor.id)
          .patch({
            enabled: feature.enabled
          })
          .then(function(result) {
            $scope.load();
          });
      };

      $scope.load = function() {
        requestService
          .url('/api/features')
          .options({
            showLoading: false
          })
          .get()
          .then(function(result) {
            $scope.list = result.list;
          });
      };
    }
  ]);
});
