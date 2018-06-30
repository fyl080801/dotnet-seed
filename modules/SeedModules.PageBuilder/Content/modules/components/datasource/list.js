define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var ListController = (function () {
        function ListController($scope, $state, $modal, popupService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
            $scope.dslist = this;
        }
        ListController.prototype.add = function () {
            this.$state.go('admin.pagebuilder_dsform');
        };
        ListController.$inject = ['$scope', '$state', '$modal', 'app/services/popupService'];
        return ListController;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/datasource/list', ListController);
});
//# sourceMappingURL=list.js.map