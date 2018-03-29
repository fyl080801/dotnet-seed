define(['SeedModules.MindPlus/ui/myworks/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/ui/myworks/controllers/tags', [
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
      $scope.list = [];

      // $scope.colors = [
      //   '#428bca',
      //   '#5cb85c',
      //   '#5bc0de',
      //   '#f0ad4e',
      //   '#d9534f',
      //   '#009688',
      //   '#777',
      //   '#000'
      // ];

      var formParams = new schemaFormParams().properties({
        name: {
          title: '名称',
          type: 'string',
          required: true
        },
        color: {
          title: '颜色',
          type: 'string',
          required: true
        }
      });

      var form = [
        'name',
        {
          key: 'color',
          type: 'simplecolor'
        }
      ];

      $scope.load = function() {
        requestService
          .url('/api/mindplus/tags')
          .options({
            showLoading: false
          })
          .get()
          .then(function(result) {
            $scope.list = result;
          });
      };

      $scope.create = function() {
        $modal
          .open({
            templateUrl: '/SeedModules.AngularUI/ui/views/schemaConfirm.html',
            size: 'sm',
            data: {
              title: '新建标签',
              formParams: formParams,
              form: form,
              model: {}
            }
          })
          .result.then(function(data) {});
      };

      $scope.drop = function(row) {
        popupService.confirm('是否删除标签？').ok(function() {});
      };
    }
  ]);
});
