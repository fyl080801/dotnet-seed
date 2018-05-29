import angular = require('angular');
import 'app/application';
import 'SeedModules.AngularUI/modules/configs/httpConfig';
import 'SeedModules.AngularUI/modules/configs/location';
import 'SeedModules.AngularUI/modules/configs/ngTableDefaults';
import 'SeedModules.AngularUI/modules/configs/ngTableTemplates';
import 'SeedModules.AngularUI/modules/configs/schemaFormDefaults';
import 'SeedModules.AngularUI/modules/configs/schemaForm';
import 'SeedModules.AngularUI/modules/configs/form/simplecolor';
import 'SeedModules.AngularUI/modules/configs/form/switchField';
import ngTableDefaults = require('SeedModules.AngularUI/modules/providers/ngTableDefaultGetData');

class RouteClass {
  static $inject = ['$provide', '$appConfig'];
  constructor($provide, $appConfig) {
    var settings = JSON.parse(
      document.getElementById('seed-ui').getAttribute('data-site')
    );
    settings.prefix = settings.prefix ? '/' + settings.prefix : '';

    $appConfig.siteSettings = settings;
  }
}

export = angular
  .module('modules.angularui', [
    'modules.angularui.configs',
    'modules.angularui.boot'
  ])
  .value(
    'SeedModules.AngularUI/modules/configs/ngTableDefaults',
    ngTableDefaults
  )
  .config(RouteClass);
