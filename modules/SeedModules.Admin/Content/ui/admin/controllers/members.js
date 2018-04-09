define(['SeedModules.Admin/modules/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/modules/admin/controllers/members', [
    '$scope',
    'SeedModules.AngularUI/modules/services/requestService',
    'SeedModules.AngularUI/modules/factories/ngTableRequest',
    function($scope, requestService, ngTableRequest) {
      $scope.tableParams = new ngTableRequest({
        url: '/api/admin/roles/' + $scope.$data.role.id + '/notmembers/query',
        showLoading: false
      }).ngTableParams(
        {
          count: 30
        },
        {
          counts: []
        }
      );

      $scope.selected = {};

      $scope.onCheck = function(user) {
        $scope.selected[user.id] = !$scope.selected[user.id];
      };
    }
  ]);
});
