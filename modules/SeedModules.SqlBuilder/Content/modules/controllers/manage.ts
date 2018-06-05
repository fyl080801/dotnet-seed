import mod = require('SeedModules.SqlBuilder/modules/module');

class ManageClass {
  static $inject = ['$scope'];
  constructor(private $scope) {}
}

mod.controller(
  'SeedModules.SqlBuilder/modules/controllers/manage',
  ManageClass
);
