define(
  [
    'app/application',
    'SeedModules.AngularUI/ui/configs/httpConfig',
    'SeedModules.AngularUI/ui/configs/location',
    'SeedModules.AngularUI/ui/configs/ngTableDefaults',
    'SeedModules.AngularUI/ui/configs/ngTableTemplates',
    'SeedModules.AngularUI/ui/providers/ngTableDefaultGetData'
  ],
  function(application) {
    'use strict';

    application.requires.push('modules.angularui');

    return angular
      .module('modules.angularui', [
        'modules.angularui.configs',
        'modules.angularui.providers'
      ])
      .config([
        '$provide',
        '$appConfig',
        function($provide, $appConfig) {
          var prefix = document
            .getElementById('seed-ui')
            .getAttribute('data-prefix');
          $appConfig.prefix = prefix ? '/' + prefix : '';
        }
      ]);
  }
);
