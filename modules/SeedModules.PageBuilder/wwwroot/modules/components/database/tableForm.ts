import mod = require('SeedModules.PageBuilder/modules/module');
import { tableform } from 'SeedModules.PageBuilder/modules/components/database/forms';

class Controller {
  static $inject = [
    '$scope',
    'SeedModules.AngularUI/modules/factories/schemaFormParams'
  ];
  constructor(private $scope, private schemaFormParams) {
    $scope.$data = $.extend(
      $scope.$data || {},
      tableform(new schemaFormParams())
    );
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/database/tableForm',
  Controller
);
