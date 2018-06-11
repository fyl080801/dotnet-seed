import angular = require('angular');
import 'angular-ui-router';
import 'schema-form-bootstrap';
import 'angular-ui-tree';

export = angular.module('modules.angularui.boot', [
  'ui.bootstrap',
  'ui.tree',
  'schemaForm'
]);
