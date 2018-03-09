define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/members', [
    '$scope',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableRequest',
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
