define(['SeedModules.MindPlus/ui/myworks/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/ui/myworks/controllers/workItems', [
    '$scope',
    '$modal',
    function($scope, $modal) {
      $scope.create = function() {
        $modal.open({
          templateUrl: '/SeedModules.MindPlus/ui/myworks/views/workItem.html',
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
