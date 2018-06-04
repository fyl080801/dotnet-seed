import mod = require('SeedModules.PageBuilder/modules/module');

class PageFormClass {
  preview() {
    this.$modal.open({
      templateUrl:
        '/SeedModules.PageBuilder/modules/components/builder/preview.html',
      size: 'lg'
    });
  }

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
