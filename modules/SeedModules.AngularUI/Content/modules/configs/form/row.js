define(["require", "exports", "SeedModules.AngularUI/modules/boot", "angular", "SeedModules.AngularUI/modules/configs/form/extendFormFields"], function (require, exports, boot, angular, extendFormFields_1) {
    "use strict";
    exports.__esModule = true;
    var RowConfig = (function () {
        function RowConfig(schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider, sfBuilderProvider) {
            var base = '/SeedModules.AngularUI/modules/templates/';
            var simpleTransclusion = sfBuilderProvider.builders.simpleTransclusion;
            var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
            var ngModel = sfBuilderProvider.builders.ngModel;
            var sfField = sfBuilderProvider.builders.sfField;
            var condition = sfBuilderProvider.builders.condition;
            var array = sfBuilderProvider.builders.array;
            var row = function (args) {
                if (args.form.columns && args.form.columns.length > 0) {
                    var rowContainer = args.fieldFrag.querySelector('.row');
                    angular.forEach(args.form.columns, function (column, idx) {
                        var div = document.createElement('div');
                        div.className =
                            'col-md-' +
                                column.flex +
                                ' col-sm-' +
                                column.flex +
                                ' col-xs-' +
                                column.flex;
                        var childFrag = args.build(column.items, args.path + '.columns[' + idx + '].items', args.state);
                        div.appendChild(childFrag);
                        rowContainer.appendChild(div);
                    });
                }
            };
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.row, base + 'row.html', [row, condition]);
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
            $templateCache.put('/SeedModules.AngularUI/modules/templates/row.html', '<div class="row"></div>');
        }
    ]);
});
//# sourceMappingURL=row.js.map