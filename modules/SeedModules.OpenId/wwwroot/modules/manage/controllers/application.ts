import mod = require('../module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {}
}

mod.controller(
  'SeedModules.OpenId/modules/manage/controllers/application',
  Controller
);
