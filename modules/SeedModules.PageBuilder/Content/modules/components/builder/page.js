define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PageController = (function () {
        function PageController($scope, popupService) {
            this.$scope = $scope;
            this.popupService = popupService;
        }
        PageController.prototype.keywordCallback = function () { };
        PageController.prototype.drop = function () {
            this.popupService.confirm('是否删除？').ok(function () { });
        };
        PageController.$inject = ['$scope', 'app/services/popupService'];
        return PageController;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/builder/page', PageController);
});
//# sourceMappingURL=page.js.map