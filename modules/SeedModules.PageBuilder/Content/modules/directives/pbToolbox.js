define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PbToolboxController = (function () {
        function PbToolboxController($scope, toolsBuilder) {
            this.$scope = $scope;
            this.toolsBuilder = toolsBuilder;
            $scope.tools = toolsBuilder.getTools();
        }
        PbToolboxController.prototype.getId = function () {
            return 'pbtools_' + this.$scope.$id;
        };
        PbToolboxController.prototype.getCategoryId = function (id) {
            return 'ptools_cate_' + id;
        };
        PbToolboxController.prototype.getIcon = function (tool) {
            return tool.icon ? tool.icon : 'fas fa-file';
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
            controllerAs: 'vm'
        };
    }
    mod.directive('pbToolbox', createPbToolbox);
});
//# sourceMappingURL=pbToolbox.js.map