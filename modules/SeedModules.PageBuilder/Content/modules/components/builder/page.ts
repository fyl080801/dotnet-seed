import mod = require('SeedModules.PageBuilder/modules/module');

interface IPageScope extends ng.IScope {
  search: {};
}

class PageController {
  keywordCallback() {}

  add() {
    this.$state.go('admin.pagebuilder_pageform');
  }

  drop() {
    this.popupService.confirm('是否删除？').ok(() => {});
  }

  static $inject = ['$scope', '$state', 'app/services/popupService'];
  constructor(
    private $scope: ng.IScope,
    private $state: ng.ui.IStateService,
    private popupService: app.services.IPopupService
  ) {}
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/page',
  PageController
);
