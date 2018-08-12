import mod = require('SeedModules.PageBuilder/modules/module');

interface IDatasourceScope extends ng.IScope {
  [key: string]: any;
  search: {
    keyword: string;
  };
  list: Array<any>;
  vm: ListController;
}

class ListController {
  add() {
    this.$state.go('admin.pagebuilder_dsform');
  }

  static $inject = ['$scope', '$state', '$modal', 'app/services/popupService'];
  constructor(
    private $scope: IDatasourceScope,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/datasource/list',
  ListController
);
