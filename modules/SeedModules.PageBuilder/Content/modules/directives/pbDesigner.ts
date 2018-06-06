import mod = require('SeedModules.PageBuilder/modules/module');

class PbDesignerController {
  static $inject = ['$scope'];
  constructor(private $scope) {}
}

function createPbDesigner(): ng.IDirective {
  return {
    replace: true,
    templateUrl: '/SeedModules.PageBuilder/modules/directives/pbDesigner.html',
    scope: {
      form: '=pbForm'
    },
    controller: PbDesignerController,
    controllerAs: 'vm'
  };
}

mod.directive('pbDesigner', createPbDesigner);
