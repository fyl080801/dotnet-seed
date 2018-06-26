import mod = require('SeedModules.PageBuilder/modules/module');

class ControllerClass {
  static $inject = ['$scope'];
  constructor(private $scope) {}
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/database/table',
  ControllerClass
);
