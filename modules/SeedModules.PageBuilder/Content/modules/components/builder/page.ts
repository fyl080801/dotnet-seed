import mod = require('SeedModules.PageBuilder/modules/module');

interface IPageScope extends ng.IScope {
  search: {};
}

class PageController {
  keywordCallback() {}

  drop() {
    this.popupService.confirm('是否删除？').ok(() => {});
  }

  static $inject = ['$scope', 'app/services/popupService'];
  constructor(
    private $scope: ng.IScope,
    private popupService: app.services.IPopupService
  ) {}
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/page',
  PageController
);
