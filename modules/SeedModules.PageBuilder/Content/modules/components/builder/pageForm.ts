import mod = require('SeedModules.PageBuilder/modules/module');
import 'rcss!/SeedModules.PageBuilder/css/page-builder.css';

class PageFormClass {
  back() {
    this.$state.go('admin.pagebuilder_page');
  }

  static $inject = ['$scope', '$state', '$modal'];
  constructor(
    private $scope,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService
  ) {}
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/pageForm',
  PageFormClass
);
