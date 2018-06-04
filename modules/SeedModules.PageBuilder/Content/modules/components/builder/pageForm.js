define(["require", "exports", "SeedModules.PageBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PageFormClass = (function () {
        function PageFormClass($scope, $state, $modal) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
        }
        PageFormClass.prototype.preview = function () {
            this.$modal.open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/preview.html',
                size: 'lg'
            });
        };
        PageFormClass.prototype.back = function () {
            this.$state.go('admin.pagebuilder_page');
        };
        PageFormClass.$inject = ['$scope', '$state', '$modal'];
        return PageFormClass;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/builder/pageForm', PageFormClass);
});
//# sourceMappingURL=pageForm.js.map