define([
  'app/application'
  // 'kityminder.editor',
  // 'SeedModules.MindPlus/modules/mind/configs/mindTemplates'
], function(application) {
  'use strict';

  application.requires.push('modules.mindPlus.mind');

  return angular
    .module('modules.mindPlus.mind', [
      'ui.router'
      // 'ui.codemirror',
      // 'kityminderEditor',
      // 'modules.mindPlus.mind.configs'
    ])
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('mindeditor', {
          url: '/mindeditor/{id}',
          templateUrl: '/SeedModules.MindPlus/modules/mind/views/editor.html',
          requires: [
            'SeedModules.AngularUI/modules/requires',
            'SeedModules.MindPlus/modules/mind/requires'
          ]
        });
      }
    ]);
});
