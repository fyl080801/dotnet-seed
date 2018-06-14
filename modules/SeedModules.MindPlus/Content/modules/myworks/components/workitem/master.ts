define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/components/workitem/master',
    [
      '$scope',
      '$state',
      '$stateParams',
      '$modal',
      'app/services/popupService',
      'SeedModules.AngularUI/modules/services/requestService',
      'SeedModules.AngularUI/modules/factories/schemaFormParams',
      function(
        $scope,
        $state,
        $stateParams,
        $modal,
        popupService,
        requestService,
        schemaFormParams
      ) {
        $scope.status = [];
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
            .result.then(function(result) {
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
                .result.then(function(result) {
                  $scope.loadWorkItems();
                });
            });
        };

        $scope.loadStatus = function() {
          requestService
            .url('/api/mindplus/works/' + $stateParams.id + '/status')
            .options({ showLoading: false })
            .get()
            .result.then(function(result) {
              $scope.status = result;
            });
        };

        $scope.addStatus = function() {
          $modal
            .open({
              templateUrl:
                '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
              data: {
                title: '添加状态',
                formParams: new schemaFormParams().properties({
                  name: {
                    title: '状态名称',
                    type: 'string',
                    required: true
                  }
                }),
                form: ['name']
              },
              size: 'sm'
            })
            .result.then(function(data) {
              requestService
                .url('/api/mindplus/works/' + $stateParams.id + '/status')
                .post(data)
                .result.then(function(result) {
                  $scope.loadStatus();
                });
            });
        };

        $scope.editStatus = function(item) {
          $modal
            .open({
              templateUrl:
                '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
              data: {
                title: '编辑状态',
                formParams: new schemaFormParams().properties({
                  name: {
                    title: '状态名称',
                    type: 'string',
                    required: true
                  }
                }),
                model: $.extend({}, item),
                form: ['name']
              },
              size: 'sm'
            })
            .result.then(function(data) {
              requestService
                .url('/api/mindplus/works/status')
                .put(data)
                .result.then(function(result) {
                  $scope.loadStatus();
                });
            });
        };

        $scope.deleteStatus = function(item) {
          popupService.confirm('是否删除？').ok(function() {
            requestService
              .url('/api/mindplus/works/status/' + item.id)
              .drop()
              .result.then(function(result) {
                $scope.loadStatus();
              });
          });
        };

        $scope.expand = function(all) {
          $scope.$broadcast('expandWorkItem', all);
        };

        $scope.reduce = function() {
          $scope.$broadcast('reduceWorkItem', null);
        };
      }
    ]
  );
});
