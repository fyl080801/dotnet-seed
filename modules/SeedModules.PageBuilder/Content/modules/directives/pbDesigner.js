define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PbDesignerController = (function () {
        function PbDesignerController($scope) {
            this.$scope = $scope;
        }
        PbDesignerController.$inject = ['$scope'];
        return PbDesignerController;
    }());
    function createPbDesigner() {
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
});
//# sourceMappingURL=pbDesigner.js.map