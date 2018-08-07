import mod = require('SeedModules.PageBuilder/modules/module');

interface IPageScope extends ng.IScope {
  search: {};
  pages: Array<any>;
  page: PageController;
}

class PageController {
  keywordCallback() {}

  preview(id) {
    this.$modal.open({
      templateUrl:
        '/SeedModules.PageBuilder/modules/components/builder/preview.html',
      size: 'lg'
    });
  }

  add() {
    this.$state.go('admin.pagebuilder_pageform');
  }

  edit(id) {
    this.$state.go('admin.pagebuilder_pageform', { id: id });
  }

  drop() {
    this.popupService.confirm('是否删除？').ok(() => {});
  }

  static $inject = ['$scope', '$state', '$modal', 'app/services/popupService'];
  constructor(
    private $scope: IPageScope,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService,
    private popupService: app.services.IPopupService
  ) {
    $scope.page = this;
    $scope.search = {
      keyword: ''
    };
    $scope.pages = [];
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/page',
  PageController
);
