import mod = require('SeedModules.PageBuilder/modules/module');

class PreviewController {
  init() {
    this.$scope.$emit('schemaFormRedraw');
  }

  static $inject = ['$scope'];
  constructor(private $scope: ng.ui.bootstrap.IModalScope) {}
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/preview',
  PreviewController
);
