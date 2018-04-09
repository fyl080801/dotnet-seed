define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/modules/myworks/controllers/workItems', [
    '$scope',
    '$modal',
    function($scope, $modal) {
      $scope.create = function() {
        $modal.open({
          templateUrl: '/SeedModules.MindPlus/modules/myworks/views/workItem.html',
          size: 'lg',
          data: {
            title: '新建任务',
            model: {}
          }
        });
      };
    }
  ]);
});
