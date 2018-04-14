define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/components/workitem/master',
    [
      '$scope',
      '$state',
      '$stateParams',
      function($scope, $state, $stateParams) {
        $scope.views = {
          'home.work.workitems.broad': {
            state: 'home.work.workitems.broad',
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
      }
    ]
  );
});
