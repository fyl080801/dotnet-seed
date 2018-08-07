define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PreviewController = (function () {
        function PreviewController($scope) {
            this.$scope = $scope;
        }
        PreviewController.prototype.init = function () {
            this.$scope.$emit('schemaFormRedraw');
        };
        PreviewController.$inject = ['$scope'];
        return PreviewController;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/builder/preview', PreviewController);
});
//# sourceMappingURL=preview.js.map