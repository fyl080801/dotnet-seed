import mod = require('SeedModules.PageBuilder/modules/module');

interface IToolsScope extends ng.IScope {
  tools: any;
}

class PbToolboxController {
  getId() {
    return 'pbtools_' + this.$scope.$id;
  }

  getCategoryId(id) {
    return 'ptools_cate_' + id;
  }

  getIcon(tool) {
    return tool.icon ? tool.icon : 'fas fa-file';
  }

  static $inject = [
    '$scope',
    'SeedModules.PageBuilder/modules/providers/toolsBuilder'
  ];
  constructor(
    private $scope: IToolsScope,
    private toolsBuilder: PageBuilder.services.IToolsBuilderService
  ) {
    $scope.tools = toolsBuilder.getTools();
  }
}

function createPbToolbox(): ng.IDirective {
  return {
    replace: false,
    templateUrl: '/SeedModules.PageBuilder/modules/directives/pbToolbox.html',
    controller: PbToolboxController,
    controllerAs: 'vm'
  };
}

mod.directive('pbToolbox', createPbToolbox);
