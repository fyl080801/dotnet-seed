define(['SeedModules.MindPlus/ui/myworks/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/ui/myworks/controllers/workspace', [
    '$scope',
    '$modal',
    '$state',
    '$stateParams',
    '$appConfig',
    'app.services.popupService',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableRequest',
    'SeedModules.AngularUI/ui/factories/schemaFormParams',
    function(
      $scope,
      $modal,
      $state,
      $stateParams,
      $appConfig,
      popupService,
      requestService,
      ngTableRequest,
      schemaFormParams
    ) {
      $scope.current = null;

      $scope.workMenu = [
        {
          text: '任务',
          icon: 'fas fa-tasks fa-fw',
          children: [
            {
              text: '脑图',
              icon: ''
            },
            {
              text: '任务列表'
            },
            {
              text: '任务板'
            }
          ]
        },
        {
          text: '设置',
          icon: 'fas fa-sitemap fa-fw'
        }
      ];

      $scope.load = function() {
        requestService
          .url('/api/mindplus/works/' + $stateParams.id)
          .get()
          .then(function(result) {
            $scope.current = result;
          });
      };
    }
  ]);
});
