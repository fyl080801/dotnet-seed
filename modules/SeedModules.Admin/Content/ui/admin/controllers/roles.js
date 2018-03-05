define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/roles', [
    '$scope',
    '$modal',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableParams',
    function($scope, $modal, requestService, ngTableParams) {
      $scope.roles = [];
      $scope.currentRole = null;
      $scope.tableParams = new ngTableParams();

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
              schema: {
                type: 'object',
                properties: {
                  rolename: {
                    title: '名称',
                    type: 'string'
                  }
                },
                required: ['rolename']
              },
              fields: ['rolename'],
              options: {},
              model: {}
            }
          })
          .result.then(function(data) {
            console.log(data);
          });
      };
    }
  ]);
});
