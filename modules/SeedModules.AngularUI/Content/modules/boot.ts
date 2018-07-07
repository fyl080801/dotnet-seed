import angular = require('angular');
import 'app/application';
import 'angular-ui-router';
import 'schema-form-bootstrap';
// import 'SeedModules.AngularUI/js/seed/tv4';
// import 'SeedModules.AngularUI/js/seed/ObjectPath';
// import 'SeedModules.AngularUI/js/seed/schema-form';
// import 'SeedModules.AngularUI/js/seed/bootstrap-decorator';
import 'SeedModules.AngularUI/js/seed/angular-ui-tree';

export = angular.module('modules.angularui.boot', [
  'ui.bootstrap',
  'ui.tree',
  'schemaForm'
]);
