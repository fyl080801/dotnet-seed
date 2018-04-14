define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/modules/myworks/controllers/home', [
    '$scope',
    '$state',
    function($scope, $state) {
      $scope.menus = [
        {
          icon: 'fas fa-briefcase',
          text: '工作',
          children: [
            {
              text: '我的工作',
              state: 'home.works',
              stateParams: {
                parentid: ''
              }
            },
            {
              text: '关注的工作'
            },
            {
              text: '全部工作'
            }
          ]
        },
        {
          icon: 'fas fa-clipboard-list',
          text: '工作模板'
        },
        {
          icon: 'fas fa-cog',
          text: '设置'
        },
        {
          icon: 'fas fa-trash-alt',
          text: '回收站',
          state: 'home.trash'
        }
      ];

      $scope.menuClicked = function(item) {
        if (item.state) $state.go(item.state, item.stateParamse || {});
      };
    }
  ]);
});
