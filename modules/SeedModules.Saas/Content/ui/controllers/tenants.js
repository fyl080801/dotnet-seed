define(['SeedModules.Saas/ui/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Saas/ui/controllers/tenants', [
    '$scope',
    '$modal',
    'SeedModules.AngularUI/ui/services/requestService',
    function($scope, $modal, requestService) {
      $scope.list = [];
      $scope.checked = {};
      $scope.total = 0;

      $scope.checkAll = function() {
        if ($scope.checkedAll) {
          $.each($scope.list, function(idx, item) {
            $scope.checked[item.name] = true;
          });
        } else {
          $.each($scope.list, function(idx, item) {
            $scope.checked[item.name] = false;
          });
        }
      };

      $scope.onCheck = function() {
        $scope.checkedAll = true;
        for (var n in $scope.checked) {
          if (!$scope.checked[n]) {
            $scope.checkedAll = false;
            break;
          }
        }
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
                $scope.load();
              });
          });
      };

      $scope.load = function() {
        requestService
          .url('/api/tenant?page=' + 1 + '&count=' + 10)
          .options({
            showLoading: false
          })
          .post({
            keyword: ''
          })
          .then(function(result) {
            $scope.list = result.list;
          });
      };
    }
  ]);
});
