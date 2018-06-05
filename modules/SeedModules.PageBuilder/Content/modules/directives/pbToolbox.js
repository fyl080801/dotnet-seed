define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PbToolboxController = (function () {
        function PbToolboxController($scope, toolsBuilder) {
            this.$scope = $scope;
            this.toolsBuilder = toolsBuilder;
            console.log(toolsBuilder);
        }
        PbToolboxController.prototype.getId = function () {
            return 'pbtools_' + this.$scope.$id;
        };
        PbToolboxController.$inject = [
            '$scope',
            'SeedModules.PageBuilder/modules/providers/toolsBuilder'
        ];
        return PbToolboxController;
    }());
    function createPbToolbox() {
        return {
            replace: false,
            templateUrl: '/SeedModules.PageBuilder/modules/directives/pbToolbox.html',
            controller: PbToolboxController,
            controllerAs: 'pbtools'
        };
    }
    mod.directive('pbToolbox', createPbToolbox);
});
//# sourceMappingURL=pbToolbox.js.map