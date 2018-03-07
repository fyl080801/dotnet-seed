define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/users', [
    '$scope',
    '$modal',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableRequest',
    'SeedModules.AngularUI/ui/factories/schemaFormParams',
    function($scope, $modal, requestService, ngTableRequest, schemaFormParams) {
      $scope.tableParams = new ngTableRequest({
        url: '/api/admin/users/query',
        showLoading: false
      }).ngTableParams();
      $scope.form = new schemaFormParams().properties({
        username: {
          title: '用户名',
          type: 'string',
          required: true
        },
        lastName: {
          title: '姓',
          type: 'string'
        },
        firstName: {
          title: '名',
          type: 'string'
        }
      });

      $scope.create = function() {};
    }
  ]);
});
