define(['SeedModules.Features/modules/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Features/modules/controllers/features', [
    '$scope',
    'SeedModules.AngularUI/modules/services/requestService',
    'SeedModules.AngularUI/modules/factories/ngTableParams',
    function($scope, requestService, ngTableParams) {
      $scope.keyword = '';
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
        return requestService
          .url('/api/features?keyword=' + $scope.keyword)
          .options({
            showLoading: false
          })
          .get()
          .then(function(result) {
            $scope.list = result.list;
          });
      };

      $scope.keywordCallback = function() {
        return $scope.load();
      };
    }
  ]);
});
