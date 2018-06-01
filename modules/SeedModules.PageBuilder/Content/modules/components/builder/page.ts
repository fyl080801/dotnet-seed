//import mod = require('SeedModules.PageBuilder/modules/module');

interface IPageScope extends ng.IScope {
  keyword: string;
}

class PageController {
  keywordCallback() {}

  static $inject = ['$scope'];
  constructor(private $scope: ng.IScope) {}
}

export = PageController;
