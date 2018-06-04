define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PageController = (function () {
        function PageController($scope, $state, popupService) {
            this.$scope = $scope;
            this.$state = $state;
            this.popupService = popupService;
        }
        PageController.prototype.keywordCallback = function () { };
        PageController.prototype.add = function () {
            this.$state.go('admin.pagebuilder_pageform');
        };
        PageController.prototype.drop = function () {
            this.popupService.confirm('是否删除？').ok(function () { });
        };
        PageController.$inject = ['$scope', '$state', 'app/services/popupService'];
        return PageController;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/builder/page', PageController);
});
//# sourceMappingURL=page.js.map