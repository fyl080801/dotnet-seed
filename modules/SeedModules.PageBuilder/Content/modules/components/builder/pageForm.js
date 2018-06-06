define(["require", "exports", "SeedModules.PageBuilder/modules/module", "rcss!/SeedModules.PageBuilder/css/page-builder.css"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var PageFormClass = (function () {
        function PageFormClass($scope, $state, $modal) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            $scope.pagename = '';
            $scope.form = [];
            $scope.model = {};
            $scope.schema = {
                type: 'object',
                properties: {}
            };
            $scope.options = {};
        }
        PageFormClass.prototype.back = function () {
            this.$state.go('admin.pagebuilder_page');
        };
        PageFormClass.prototype.refresh = function () {
            this.$scope.$broadcast('schemaFormRedraw');
        };
        PageFormClass.$inject = ['$scope', '$state', '$modal'];
        return PageFormClass;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/builder/pageForm', PageFormClass);
});
//# sourceMappingURL=pageForm.js.map