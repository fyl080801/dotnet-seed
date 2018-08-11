define(["require", "exports", "SeedModules.PageBuilder/modules/module", "SeedModules.PageBuilder/modules/components/database/forms", "SeedModules.PageBuilder/modules/configs/enums"], function (require, exports, mod, forms_1, enums_1) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope, schemaFormParams) {
            this.$scope = $scope;
            this.schemaFormParams = schemaFormParams;
            $scope.vm = this;
            $scope.dataTypes = enums_1.DataTypes;
            $scope.$data = $.extend($scope.$data || {}, forms_1.tableform(new schemaFormParams()));
            $scope.newColumn = {};
        }
        Controller.prototype.lengthDisabled = function (row) {
            return (row.type !== enums_1.DataTypes.字符串 + '' && row.type !== enums_1.DataTypes.小数 + '');
        };
        Controller.prototype.accuracyDisabled = function (row) {
            return row.type !== enums_1.DataTypes.小数 + '';
        };
        Controller.prototype.addColumn = function () {
            this.$scope.$data.model.columns = this.$scope.$data.model.columns || [];
            this.$scope.$data.model.columns.push($.extend({}, this.$scope.newColumn));
            this.$scope.newColumn = {};
        };
        Controller.prototype.removeColumn = function (idx) {
            this.$scope.$data.model.columns.splice(idx, 1);
        };
        Controller.$inject = [
            '$scope',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return Controller;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/database/tableColumns', Controller);
});
//# sourceMappingURL=tableColumns.js.map