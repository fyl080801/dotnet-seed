define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/components/work/work',
    [
      '$scope',
      '$state',
      '$stateParams',
      'SeedModules.AngularUI/modules/services/requestService',
      function($scope, $state, $stateParams, requestService) {
        $scope.current = null;

        $scope.loadDetails = function() {
          requestService
            .url('/api/mindplus/works/' + $stateParams.id)
            .options({
              showLoading: false
            })
            .get()
            .then(function(result) {
              $scope.current = result;
            });
        };
      }
    ]
  );
});
