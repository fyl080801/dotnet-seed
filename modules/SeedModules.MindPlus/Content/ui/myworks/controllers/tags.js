define(['SeedModules.MindPlus/ui/myworks/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/ui/myworks/controllers/tags', [
    '$scope',
    'app.services.popupService',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableRequest',
    function($scope, popupService, requestService, ngTableRequest) {
      $scope.list = [];

      $scope.colors = [
        '#428bca',
        '#5cb85c',
        '#5bc0de',
        '#f0ad4e',
        '#d9534f',
        '#009688',
        '#777',
        '#000'
      ];

      $scope.editing = null;

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
        $scope.editing = { id: 0 };
        $scope.list.push({ id: 0 });
      };

      $scope.drop = function(row) {
        popupService.confirm('是否删除标签？').ok(function() {});
      };
    }
  ]);
});
