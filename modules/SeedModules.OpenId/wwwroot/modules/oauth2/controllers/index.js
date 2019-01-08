define(["require", "exports", "SeedModules.OpenId/modules/oauth2/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope) {
            this.$scope = $scope;
        }
        Controller.$inject = ['$scope'];
        return Controller;
    }());
    mod.controller('SeedModules.OpenId/modules/oauth2/controllers/index', Controller);
});
//# sourceMappingURL=index.js.map