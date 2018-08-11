define(["require", "exports", "SeedModules.PageBuilder/modules/module", "SeedModules.PageBuilder/modules/components/database/forms"], function (require, exports, mod, forms_1) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope, schemaFormParams) {
            this.$scope = $scope;
            this.schemaFormParams = schemaFormParams;
            $scope.$data = $.extend($scope.$data || {}, forms_1.tableform(new schemaFormParams()));
        }
        Controller.$inject = [
            '$scope',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return Controller;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/database/tableForm', Controller);
});
//# sourceMappingURL=tableForm.js.map