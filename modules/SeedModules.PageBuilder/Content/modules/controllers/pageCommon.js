define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PageCommonController = (function () {
        function PageCommonController($scope) {
            this.$scope = $scope;
            $scope.pageCommon = this;
        }
        PageCommonController.prototype.datasource = function (id) { };
        PageCommonController.$inject = ['$scope'];
        return PageCommonController;
    }());
    mod.controller('SeedModules.PageBuilder/modules/controllers/pageCommon', PageCommonController);
});
//# sourceMappingURL=pageCommon.js.map