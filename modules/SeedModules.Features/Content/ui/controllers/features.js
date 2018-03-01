define(['SeedModules.Features/ui/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Features/ui/controllers/features', [
    '$scope',
    'SeedModules.AngularUI/ui/factories/ngTableParams',
    function($scope, ngTableParams) {
      $scope.list = [
        {
          id: 1,
          text: 'aaaa'
        },
        {
          id: 2,
          text: 'aaaa'
        }
      ];

      $scope.tableParams = new ngTableParams(
        {},
        {
          data: [
            {
              id: 1,
              text: 'aaaa'
            },
            {
              id: 2,
              text: 'aaaa'
            }
          ]
        }
      );
    }
  ]);
});
