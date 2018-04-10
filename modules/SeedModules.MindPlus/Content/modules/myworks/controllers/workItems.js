define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/controllers/workItems',
    [
      '$scope',
      '$modal',
      '$appEnvironment',
      function($scope, $modal, $appEnvironment) {
        $scope.create = function() {
          $modal.open({
            templateUrl:
              '/SeedModules.MindPlus/modules/myworks/views/workItem.html',
            size: 'lg',
            data: {
              title: '新建任务',
              model: {
                work: $appEnvironment.currentWork
              }
            }
          });
        };
      }
    ]
  );
});
