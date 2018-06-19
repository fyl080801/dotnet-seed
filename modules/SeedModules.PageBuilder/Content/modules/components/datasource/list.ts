import mod = require('SeedModules.PageBuilder/modules/module');

interface IDatasourceScope extends ng.IScope {
  search: {};
  datasources: Array<any>;
  dslist: ListController;
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
    $scope.dslist = this;
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/datasource/list',
  ListController
);
