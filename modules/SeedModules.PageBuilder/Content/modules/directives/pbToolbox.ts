import mod = require('SeedModules.PageBuilder/modules/module');

class PbToolboxController {
  getId() {
    return 'pbtools_' + this.$scope.$id;
  }

  static $inject = [
    '$scope',
    'SeedModules.PageBuilder/modules/providers/toolsBuilder'
  ];
  constructor(
    private $scope: ng.IScope,
    private toolsBuilder: PageBuilder.services.IToolsBuilderService
  ) {
    console.log(toolsBuilder);
  }
}

function createPbToolbox(): ng.IDirective {
  return {
    replace: false,
    templateUrl: '/SeedModules.PageBuilder/modules/directives/pbToolbox.html',
    controller: PbToolboxController,
    controllerAs: 'pbtools'
  };
}

mod.directive('pbToolbox', createPbToolbox);
