import mod = require('SeedModules.PageBuilder/modules/module');

class PbDesignerItemController {
  static $inject = ['$scope'];
  constructor(private $scope) {}
}

function createDirective(): ng.IDirective {
  return {
    replace: true,
    templateUrl: (element: JQLite, attrs: ng.IAttributes) => {
      if (attrs.itemType && attrs.itemType !== '') {
        return '';
        // var fn = Function;
        // return new fn('return ' + attrs.rootTemplateUrl + ';')();
      } else {
        return '';
      }
    },
    controller: PbDesignerItemController,
    controllerAs: 'vm'
  };
}

mod.directive('pbDesignerItem', createDirective);
