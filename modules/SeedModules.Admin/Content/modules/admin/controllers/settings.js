define(["require", "exports", "SeedModules.Admin/modules/admin/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var SettingsController = (function () {
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
    mod.controller('SeedModules.Admin/modules/admin/controllers/settings', SettingsController);
});

//# sourceMappingURL=settings.js.map
