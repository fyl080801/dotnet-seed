define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PbDesignerItemController = (function () {
        function PbDesignerItemController($scope) {
            this.$scope = $scope;
        }
        PbDesignerItemController.$inject = ['$scope'];
        return PbDesignerItemController;
    }());
    function createDirective() {
        return {
            replace: true,
            templateUrl: function (element, attrs) {
                if (attrs.itemType && attrs.itemType !== '') {
                    return '';
                }
                else {
                    return '';
                }
            },
            controller: PbDesignerItemController,
            controllerAs: 'vm'
        };
    }
    mod.directive('pbDesignerItem', createDirective);
});
//# sourceMappingURL=pbDesignerItem.js.map