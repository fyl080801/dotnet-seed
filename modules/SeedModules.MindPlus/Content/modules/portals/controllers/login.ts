import mod = require('SeedModules.MindPlus/modules/portals/module');

class Controller {
  login() {}

  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.vm = this;
    $scope.sfform = {};
  }
}

mod.controller(
  'SeedModules.MindPlus/modules/portals/controllers/login',
  Controller
);
