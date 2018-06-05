import mod = require('SeedModules.PageBuilder/modules/module');

interface IPageScope extends ng.IScope {
  search: {};
}

class PageController {
  keywordCallback() {}

  preview() {
    this.$modal.open({
      templateUrl:
        '/SeedModules.PageBuilder/modules/components/builder/preview.html',
      size: 'lg'
    });
  }

  add() {
    this.$state.go('admin.pagebuilder_pageform');
  }

  drop() {
    this.popupService.confirm('是否删除？').ok(() => {});
  }

  static $inject = ['$scope', '$state', '$modal', 'app/services/popupService'];
  constructor(
    private $scope: ng.IScope,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService,
    private popupService: app.services.IPopupService
  ) {}
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/page',
  PageController
);
