import mod = require('SeedModules.PageBuilder/modules/module');
import 'rcss!/SeedModules.PageBuilder/css/page-builder.css';

interface IPageFormScope extends ng.IScope {
  pagename: string;
  form: Array<any>;
  schema: any;
  options: any;
  model: any;
}

class PageFormClass {
  back() {
    this.$state.go('admin.pagebuilder_page');
  }

  refresh() {
    this.$scope.$broadcast('schemaFormRedraw');
  }

  static $inject = ['$scope', '$state', '$modal'];
  constructor(
    private $scope: IPageFormScope,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService
  ) {
    $scope.pagename = '';
    $scope.form = [];
    $scope.model = {};
    $scope.schema = {
      type: 'object',
      properties: {}
    };
    $scope.options = {};
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/pageForm',
  PageFormClass
);
