define(["require", "exports", "SeedModules.AngularUI/modules/boot", "SeedModules.AngularUI/modules/configs/enums/extendFormFields"], function (require, exports, boot, extendFormFields_1) {
    "use strict";
    exports.__esModule = true;
    var base = '/SeedModules.AngularUI/modules/templates/form/';
    var PanelConfig = (function () {
        function PanelConfig(schemaFormDecoratorsProvider, sfBuilderProvider) {
            var defaultBuilders = [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.transclusion
            ];
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.table, base + 'table.html', defaultBuilders);
        }
        PanelConfig.$inject = ['schemaFormDecoratorsProvider', 'sfBuilderProvider'];
        return PanelConfig;
    }());
    boot.config(PanelConfig).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put(base + 'table.html', '<table class="table" ng-table-dynamic="form.tableParams with form.tableColumns"><tr ng-repeat="row in $data"><td ng-repeat="col in $columns">{{row[col.field]}}</td></tr></table>');
        }
    ]);
});
