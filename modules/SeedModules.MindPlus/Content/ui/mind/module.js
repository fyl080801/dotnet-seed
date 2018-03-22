define([
  'app/application',
  'kityminder.editor',
  'SeedModules.MindPlus/ui/mind/configs/mindTemplates'
], function(application) {
  'use strict';

  application.requires.push('modules.mindPlus.mind');

  return angular
    .module('modules.mindPlus.mind', [
      'ui.router',
      // 'ui.codemirror',
      // 'ui.colorpicker',
      'kityminderEditor',
      'modules.mindPlus.mind.configs'
    ])
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('mindeditor', {
          url: '/mindeditor/{id}',
          templateUrl: '/SeedModules.MindPlus/ui/mind/views/editor.html',
          requires: [
            'SeedModules.AngularUI/ui/requires',
            'SeedModules.MindPlus/ui/mind/requires'
          ]
        });
      }
    ]);
});
