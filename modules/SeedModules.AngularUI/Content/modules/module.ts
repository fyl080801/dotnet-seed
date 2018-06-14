import angular = require('angular');
import 'app/application';
import 'SeedModules.AngularUI/modules/configs/httpConfig';
import 'SeedModules.AngularUI/modules/configs/location';
import 'SeedModules.AngularUI/modules/configs/ngTableDefaults';
import 'SeedModules.AngularUI/modules/configs/ngTableTemplates';
import 'SeedModules.AngularUI/modules/configs/schemaForm';
import 'SeedModules.AngularUI/modules/configs/form/simplecolor';
import 'SeedModules.AngularUI/modules/configs/form/switchField';
import 'SeedModules.AngularUI/modules/configs/form/layout';
import 'SeedModules.AngularUI/modules/configs/form/panel';
import 'SeedModules.AngularUI/modules/configs/form/table';
import 'SeedModules.AngularUI/modules/providers/ngTableDefaultGetData';
import 'SeedModules.AngularUI/modules/configs/schemaFormDefaults';

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

angular.module('template/modal/window.html', []).run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put(
      'template/modal/window.html',
      '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n' +
        '    <div class="modal-dialog modal-{{size}}"><div class="modal-content" modal-transclude></div></div>\n' +
        '</div>'
    );
  }
]);

export = angular
  .module('modules.angularui', ['modules.angularui.boot'])
  .config(RouteClass);
