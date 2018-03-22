define(['app/application', 'kityminder.editor'], function(application) {
  'use strict';

  application.requires.push('modules.mindPlus.mind');

  return angular
    .module('modules.mindPlus.mind', [
      'ui.router',
      'ui.codemirror',
      'ui.colorpicker',
      'kityminderEditor'
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
