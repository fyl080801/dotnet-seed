define(["require", "exports", "SeedModules.AngularUI/modules/boot", "SeedModules.AngularUI/modules/configs/enums/extendFormFields"], function (require, exports, boot, extendFormFields_1) {
    "use strict";
    exports.__esModule = true;
    var base = '/SeedModules.AngularUI/modules/templates/form/';
    var RowConfig = (function () {
        function RowConfig(schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider, sfBuilderProvider) {
            var layoutDefaults = [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.transclusion
            ];
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.row, base + 'row.html', layoutDefaults);
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.column, base + 'column.html', layoutDefaults);
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.navbar, base + 'navbar.html', layoutDefaults);
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
            $templateCache.put(base + 'row.html', '<div class="row" sf-field-transclude="items"></div>');
            $templateCache.put(base + 'column.html', '<div class="col-md-{{form.flex}} col-lg-{{form.flex}} col-sm-{{form.flex}} col-xs-{{flex}}" sf-field-transclude="items"></div>');
            $templateCache.put(base + 'navbar.html', '<div class="navbar navbar-{{form.theme}} {{form.htmlClass}}" style="margin: 0" sf-field-transclude="items"></div>');
        }
    ]);
});
//# sourceMappingURL=layout.js.map