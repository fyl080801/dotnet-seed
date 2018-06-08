define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/components/work/work',
    [
      '$scope',
      '$state',
      '$stateParams',
      '$modal',
      'SeedModules.AngularUI/modules/services/requestService',
      function($scope, $state, $stateParams, $modal, requestService) {
        $scope.current = null;

        $scope.loadDetails = function() {
          requestService
            .url('/api/mindplus/works/' + $stateParams.id)
            .options({
              showLoading: false
            })
            .get()
            .result.then(function(result) {
              $scope.current = result;
            });
        };

        $scope.settings = function() {
          $modal.open({
            templateUrl:
              '/SeedModules.MindPlus/modules/myworks/components/work/workSettings.html'
          });
        };
      }
    ]
  );
});
