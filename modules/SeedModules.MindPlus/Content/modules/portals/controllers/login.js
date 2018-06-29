define(["require", "exports", "SeedModules.MindPlus/modules/portals/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope) {
            this.$scope = $scope;
            $scope.vm = this;
            $scope.sfform = {};
        }
        Controller.prototype.login = function () { };
        Controller.$inject = ['$scope'];
        return Controller;
    }());
    mod.controller('SeedModules.MindPlus/modules/portals/controllers/login', Controller);
});
//# sourceMappingURL=login.js.map