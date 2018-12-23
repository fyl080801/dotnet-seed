import mod = require('SeedModules.Arkham/modules/facilities/module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope: any) {
    // $scope.keyword = '';
    // $scope.list = [];
    // $scope.features = this;
  }
}

mod.controller('SeedModules.Arkham/modules/facilities/controllers/home', Controller);
