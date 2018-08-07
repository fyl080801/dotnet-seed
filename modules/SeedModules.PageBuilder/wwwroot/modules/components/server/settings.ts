import mod = require('SeedModules.PageBuilder/modules/module');

class SettingsController {
  static $inject = ['$scope'];
  constructor(private $scope) {}
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/server/settings',
  SettingsController
);
