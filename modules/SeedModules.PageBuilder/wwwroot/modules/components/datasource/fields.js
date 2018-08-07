define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var ControllerClass = (function () {
        function ControllerClass($scope) {
            this.$scope = $scope;
        }
        ControllerClass.$inject = ['$scope'];
        return ControllerClass;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/datasource/fields', ControllerClass);
});
//# sourceMappingURL=fields.js.map