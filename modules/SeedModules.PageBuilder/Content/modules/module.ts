import angular = require('angular');
import 'app/application';
import 'angular-jsoneditor';
import 'schema-form-bootstrap';
import 'SeedModules.PageBuilder/modules/configs/run';
import 'SeedModules.PageBuilder/modules/configs/defaultTools';
import 'SeedModules.PageBuilder/modules/providers/toolsBuilder';

export = angular.module('modules.pagebuilder', [
  'modules.pagebuilder.boot',
  'angular-jsoneditor',
  'schemaForm'
]);
