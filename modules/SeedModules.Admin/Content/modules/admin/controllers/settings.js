define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var SettingsController = /** @class */ (function () {
        function SettingsController($scope, schemaFormParams) {
            this.$scope = $scope;
            this.schemaFormParams = schemaFormParams;
            $scope.formParams = new schemaFormParams();
            $scope.form = [];
        }
        SettingsController.$inject = [
            '$scope',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return SettingsController;
    }());
    exports.SettingsController = SettingsController;
});
//# sourceMappingURL=settings.js.map