define(["require", "exports", "../module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope) {
            this.$scope = $scope;
        }
        Controller.$inject = ['$scope'];
        return Controller;
    }());
    mod.controller('SeedModules.OpenId/modules/manage/controllers/application', Controller);
});
//# sourceMappingURL=application.js.map