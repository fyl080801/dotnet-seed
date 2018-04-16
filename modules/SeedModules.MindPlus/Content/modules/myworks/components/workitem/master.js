define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/components/workitem/master',
    [
      '$scope',
      '$state',
      '$stateParams',
      '$modal',
      'SeedModules.AngularUI/modules/services/requestService',
      function($scope, $state, $stateParams, $modal, requestService) {
        $scope.workitems = [];

        $scope.views = {
          'home.work.workitems.board': {
            state: 'home.work.workitems.board',
            text: '看板视图',
            icon: 'glyphicon glyphicon-blackboard'
          },
          'home.work.workitems.mind': {
            state: 'home.work.workitems.mind',
            text: '脑图',
            icon: 'glyphicon glyphicon-cloud'
          },
          'home.work.workitems.document': {
            state: 'home.work.workitems.document',
            text: '文档视图',
            icon: 'glyphicon glyphicon-file'
          },
          'home.work.workitems.gantt': {
            state: 'home.work.workitems.gantt',
            text: '甘特图',
            icon: 'glyphicon glyphicon-tasks'
          }
        };

        $scope.loadWorkItems = function() {
          requestService
            .url(
              '/api/mindplus/workitem/inwork/' +
                $stateParams.id +
                '?keyword=' +
                ($scope.finished !== null ? '&finished=' + $scope.finished : '')
            )
            .options({
              showLoading: false
            })
            .get()
            .then(function(result) {
              $scope.workitems = result;
            });
        };

        $scope.createWorkItem = function() {
          $modal
            .open({
              templateUrl:
                '/SeedModules.MindPlus/modules/myworks/views/workItem.html',
              size: 'lg',
              data: {
                title: '新建任务',
                model: {},
                work: $scope.current
              }
            })
            .result.then(function(data) {
              requestService
                .url('/api/mindplus/workitem')
                .post(data)
                .then(function(result) {
                  $scope.loadWorkItems();
                });
            });
        };
      }
    ]
  );
});
