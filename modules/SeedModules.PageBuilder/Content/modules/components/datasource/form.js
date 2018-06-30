define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var FormController = (function () {
        function FormController($scope, $state, $modal, popupService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
            $scope.dsform = this;
        }
        FormController.prototype.cancel = function () {
            this.$state.go('admin.pagebuilder_datasource');
        };
        FormController.$inject = ['$scope', '$state', '$modal', 'app/services/popupService'];
        return FormController;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/datasource/form', FormController);
});

//# sourceMappingURL=form.js.map
