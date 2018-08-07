import mod = require('SeedModules.PageBuilder/modules/module');

class FormController {
  cancel() {
    this.$state.go('admin.pagebuilder_datasource');
  }

  static $inject = ['$scope', '$state', '$modal', 'app/services/popupService'];
  constructor(
    private $scope,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService,
    private popupService: app.services.IPopupService
  ) {
    $scope.dsform = this;
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/datasource/form',
  FormController
);
