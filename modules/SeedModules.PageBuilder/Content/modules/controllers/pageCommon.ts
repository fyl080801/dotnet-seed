import mod = require('SeedModules.PageBuilder/modules/module');

class PageCommonController {
  datasource(id) {}

  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.pageCommon = this;
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/controllers/pageCommon',
  PageCommonController
);
