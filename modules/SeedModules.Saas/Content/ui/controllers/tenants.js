define(['SeedModules.Saas/ui/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Saas/ui/controllers/tenants', [
    '$scope',
    '$modal',
    'app.services.popupService',
    'SeedModules.AngularUI/ui/factories/ngTableRequest',
    'SeedModules.AngularUI/ui/services/requestService',
    function($scope, $modal, popupService, ngTableRequest, requestService) {
      $scope.tableParams = new ngTableRequest({
        url: '/api/tenant',
        showLoading: false
      }).ngTableParams();

      $scope.checkedAll = false;
      $scope.checked = {};

      $scope.checkAll = function() {
        $scope.checkedAll = !$scope.checkedAll;
        if ($scope.checkedAll) {
          $.each($scope.tableParams.data, function(idx, item) {
            $scope.checked[item.name] = true;
          });
        } else {
          $.each($scope.tableParams.data, function(idx, item) {
            $scope.checked[item.name] = false;
          });
        }
      };

      $scope.onCheck = function() {
        $scope.checkedAll = true;
        $.each($scope.tableParams.data, function(idx, item) {
          if (!$scope.checked[item.name]) {
            $scope.checkedAll = false;
            return false;
          }
        });
      };

      $scope.create = function() {
        $modal
          .open({
            templateUrl: '/SeedModules.Saas/ui/views/tenantForm.html'
          })
          .result.then(function(data) {
            requestService
              .url('/api/tenant/info')
              .post(data)
              .then(function(result) {
                $scope.tableParams.reload();
              });
          });
      };

      $scope.drop = function() {
        popupService.confirm('是否删除？').ok(function() {});
      };
    }
  ]);
});
