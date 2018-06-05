define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PageController = (function () {
        function PageController($scope, $state, $modal, popupService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
        }
        PageController.prototype.keywordCallback = function () { };
        PageController.prototype.preview = function () {
            this.$modal.open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/preview.html',
                size: 'lg'
            });
        };
        PageController.prototype.add = function () {
            this.$state.go('admin.pagebuilder_pageform');
        };
        PageController.prototype.drop = function () {
            this.popupService.confirm('是否删除？').ok(function () { });
        };
        PageController.$inject = ['$scope', '$state', '$modal', 'app/services/popupService'];
        return PageController;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/builder/page', PageController);
});
//# sourceMappingURL=page.js.map