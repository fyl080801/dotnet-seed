import angular = require('angular');
import 'SeedModules.AngularUI/modules/configs/httpConfig';
import 'SeedModules.AngularUI/modules/configs/location';
import 'SeedModules.AngularUI/modules/configs/ngTableDefaults';
import 'SeedModules.AngularUI/modules/configs/ngTableTemplates';
import 'SeedModules.AngularUI/modules/configs/schemaFormDefaults';
import 'SeedModules.AngularUI/modules/configs/schemaForm';
import 'SeedModules.AngularUI/modules/configs/form/simplecolor';
import 'SeedModules.AngularUI/modules/configs/form/switchField';
import 'SeedModules.AngularUI/modules/providers/ngTableDefaultGetData';

export = angular
  .module('modules.angularui', [
    'modules.angularui.configs',
    'modules.angularui.providers'
  ])
  .config([
    '$provide',
    '$appConfig',
    function($provide, $appConfig) {
      var settings = JSON.parse(
        document.getElementById('seed-ui').getAttribute('data-site')
      );
      settings.prefix = settings.prefix ? '/' + settings.prefix : '';

      $appConfig.siteSettings = settings;
    }
  ]);
