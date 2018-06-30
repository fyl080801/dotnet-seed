define(["require", "exports", "SeedModules.SqlBuilder/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var ManageClass = (function () {
        function ManageClass($scope) {
            this.$scope = $scope;
        }
        ManageClass.$inject = ['$scope'];
        return ManageClass;
    }());
    mod.controller('SeedModules.SqlBuilder/modules/controllers/manage', ManageClass);
});

//# sourceMappingURL=manage.js.map
