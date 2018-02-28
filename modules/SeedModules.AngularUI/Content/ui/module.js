define(
  [
    'app/application',
    'SeedModules.AngularUI/ui/configs/httpConfig',
    'SeedModules.AngularUI/ui/configs/location'
  ],
  function(application) {
    'use strict';

    application.requires.push('modules.angularui');

    return angular
      .module('modules.angularui', ['modules.angularui.configs'])
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
