import angular = require('angular');
import 'app/application';
import 'angular-ui-router';
import 'SeedModules.AngularUI/js/seed/bootstrap-decorator';
import 'SeedModules.AngularUI/js/seed/angular-ui-tree';

export = angular.module('modules.angularui.boot', [
  'ui.bootstrap',
  'ui.tree',
  'schemaForm'
]);
