define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/roles', [
    '$scope',
    '$modal',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableRequest',
    'SeedModules.AngularUI/ui/factories/schemaFormParams',
    function($scope, $modal, requestService, ngTableRequest, schemaFormParams) {
      $scope.roles = [];
      $scope.currentRole = null;
      $scope.tableParams = null;
      $scope.tableRequest = new ngTableRequest({
        //url: '/api/admin/roles/' + $scope.currentRole.id + '/members/query',
        showLoading: false
      });

      // 选择
      $scope.checkedAll = false;
      $scope.checked = {};

      $scope.checkAll = function() {
        $scope.checkedAll = !$scope.checkedAll;
        if ($scope.checkedAll) {
          $.each($scope.tableParams.data, function(idx, item) {
            $scope.checked[item.id] = true;
          });
        } else {
          $.each($scope.tableParams.data, function(idx, item) {
            $scope.checked[item.id] = false;
          });
        }
      };

      $scope.onCheck = function() {
        $scope.checkedAll = true;
        $.each($scope.tableParams.data, function(idx, item) {
          if (!$scope.checked[item.id]) {
            $scope.checkedAll = false;
            return false;
          }
        });
      };

      // 方法
      $scope.roleForm = new schemaFormParams().properties({
        rolename: {
          title: '名称',
          type: 'string',
          required: true
        }
      });

      $scope.loadRoles = function() {
        requestService
          .url('/api/admin/roles')
          .options({
            showLoading: false
          })
          .get()
          .then(function(result) {
            $scope.roles = result;
          });
      };

      $scope.selectRole = function(role) {
        $scope.currentRole = role;
      };

      $scope.cancelEditing = function() {
        $scope.currentRole = null;
      };

      $scope.create = function() {
        $modal
          .open({
            templateUrl: 'SeedModules.AngularUI/ui/views/schemaConfirm.html',
            size: 'sm',
            data: {
              title: '新建角色',
              formParams: $scope.roleForm,
              form: ['rolename', 'displayName']
            }
          })
          .result.then(function(data) {
            requestService
              .url('/api/admin/roles')
              .post(data)
              .then(function(result) {
                $scope.loadRoles();
              });
          });
      };

      $scope.loadRoleDetails = function(role) {
        $scope.checkedAll = false;
        $scope.checked = {};

        if (role === null) return;

        $scope.tableParams = $scope.tableRequest
          .options({
            url: '/api/admin/roles/' + role.id + '/members/query'
          })
          .ngTableParams();
      };

      $scope.$watch(function() {
        return $scope.currentRole;
      }, $scope.loadRoleDetails);
    }
  ]);
});
