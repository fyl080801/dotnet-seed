define(['app/application'], function(application) {
  'use strict';

  application.requires.push('modules.features');

  return angular
    .module('modules.features', ['ui.router'])
    .config([
      '$stateProvider',
      function($stateProvider) {
        $stateProvider.state('admin.features', {
          url: '/features',
          title: '功能管理',
          templateUrl: '/SeedModules.Features/modules/views/features.html',
          requires: [
            'SeedModules.AngularUI/modules/requires',
            'SeedModules.Features/modules/requires'
          ]
        });
      }
    ])
    .run([
      '$state',
      'SeedModules.Admin/modules/admin/configs/nav',
      function($state, nav) {
        nav.add({
          text: '功能管理',
          icon: 'fas fa-cubes fa-fw',
          order: 2,
          itemClicked: function(evt) {
            $state.go('admin.features');
          }
        });
      }
    ]);
});
