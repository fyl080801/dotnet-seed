define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var SettingsController = (function () {
        function SettingsController($scope) {
            this.$scope = $scope;
        }
        SettingsController.$inject = ['$scope'];
        return SettingsController;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/server/settings', SettingsController);
});
