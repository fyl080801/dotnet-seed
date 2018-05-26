import mod = require('SeedModules.Admin/modules/admin/module');

class SettingsController {
  static $inject = ['$scope'];
  constructor(private $scope) {}
}

mod.controller('SeedModules.Admin/modules/admin/controllers/settings', SettingsController);
