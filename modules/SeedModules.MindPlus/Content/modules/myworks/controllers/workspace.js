define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/controllers/workspace',
    [
      '$scope',
      '$modal',
      '$state',
      '$stateParams',
      '$appConfig',
      '$appEnvironment',
      'app/services/popupService',
      'SeedModules.AngularUI/modules/services/requestService',
      'SeedModules.AngularUI/modules/factories/ngTableRequest',
      'SeedModules.AngularUI/modules/factories/schemaFormParams',
      function(
        $scope,
        $modal,
        $state,
        $stateParams,
        $appConfig,
        $appEnvironment,
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
                icon: 'fas fa-fw',
                text: '脑图',
                itemClicked: function(item) {
                  window.location =
                    $appConfig.siteSettings.prefix +
                    '/SeedModules.MindPlus/Home/Mind#/mindeditor/' +
                    $stateParams.id;
                }
              },
              {
                icon: 'fas fa-fw',
                text: '任务列表',
                itemClicked: function() {
                  $state.go('workspace.list', { id: $stateParams.id });
                }
              },
              {
                icon: 'fas fa-fw',
                text: '任务板'
              },
              {
                icon: 'fas fa-fw',
                text: '进度'
              }
            ]
          },
          {
            text: '设置',
            icon: 'fas fa-cogs fa-fw',
            children: [
              {
                icon: 'fas fa-fw',
                text: '任务设置',
                itemClicked: function() {
                  $state.go('workspace.settings', { id: $stateParams.id });
                }
              },
              {
                icon: 'fas fa-fw',
                text: '标签设置',
                itemClicked: function() {
                  $state.go('workspace.tags', { id: $stateParams.id });
                }
              }
            ]
          }
        ];

        $scope.load = function() {
          requestService
            .url('/api/mindplus/works/' + $stateParams.id)
            .options({
              showLoading: false
            })
            .get()
            .result.then(function(result) {
              $scope.current = result;
              $appEnvironment.currentWork = result;
            });
        };
      }
    ]
  );
});
