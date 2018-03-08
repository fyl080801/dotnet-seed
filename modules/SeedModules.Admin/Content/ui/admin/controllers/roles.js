define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/roles', [
    '$scope',
    '$modal',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableParams',
    'SeedModules.AngularUI/ui/factories/schemaFormParams',
    function($scope, $modal, requestService, ngTableParams, schemaFormParams) {
      $scope.roles = [];
      $scope.currentRole = null;
      $scope.tableParams = new ngTableParams();
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
    }
  ]);
});
