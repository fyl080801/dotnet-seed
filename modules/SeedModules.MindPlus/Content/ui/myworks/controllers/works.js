define(['SeedModules.MindPlus/ui/myworks/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/ui/myworks/controllers/works', [
    '$scope',
    '$modal',
    'app.services.popupService',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableRequest',
    'SeedModules.AngularUI/ui/factories/schemaFormParams',
    function(
      $scope,
      $modal,
      popupService,
      requestService,
      ngTableRequest,
      schemaFormParams
    ) {
      $scope.tableParams = new ngTableRequest({
        url: '/api/mindplus/works/query',
        showLoading: false
      }).ngTableParams();

      $scope.formParams = new schemaFormParams().properties({
        name: {
          title: '名称',
          type: 'string',
          required: true
        },
        description: {
          title: '描述',
          type: 'string'
        }
      });

      $scope.form = [
        'name',
        {
          key: 'description',
          type: 'textarea',
          placeholder: '描述信息'
        }
      ];

      $scope.create = function() {
        $modal.open({
          templateUrl: '/SeedModules.AngularUI/ui/views/schemaConfirm.html',
          data: {
            title: '新建项目',
            formParams: $scope.formParams,
            form: $scope.form
          }
        });
      };
    }
  ]);
});
