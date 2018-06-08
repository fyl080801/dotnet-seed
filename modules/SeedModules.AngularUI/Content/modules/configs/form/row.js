define(["require", "exports", "SeedModules.AngularUI/modules/boot", "SeedModules.AngularUI/modules/configs/enums/extendFormFields"], function (require, exports, boot, extendFormFields_1) {
    "use strict";
    exports.__esModule = true;
    var base = '/SeedModules.AngularUI/modules/templates/form/';
    var RowConfig = (function () {
        function RowConfig(schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider, sfBuilderProvider) {
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.row, base + 'row.html', [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.transclusion
            ]);
        }
        RowConfig.$inject = [
            'schemaFormDecoratorsProvider',
            'schemaFormProvider',
            'sfPathProvider',
            'sfBuilderProvider'
        ];
        return RowConfig;
    }());
    boot.config(RowConfig).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('/SeedModules.AngularUI/modules/templates/form/row.html', '<div class="row" sf-field-transclude="columns"></div>');
        }
    ]);
});
//# sourceMappingURL=row.js.map