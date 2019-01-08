import mod = require('SeedModules.OpenId/modules/oauth2/module');

class Controller {
  static $inject = ['$scope'];

  constructor(private $scope) {}
}

mod.controller(
  'SeedModules.OpenId/modules/oauth2/controllers/index',
  Controller
);
