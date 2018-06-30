define(["require", "exports", "SeedModules.AngularUI/modules/boot", "angular"], function (require, exports, boot, angular) {
    "use strict";
    exports.__esModule = true;
    var SchemaFormClass = (function () {
        function SchemaFormClass(schemaFormDecoratorsProvider, schemaFormProvider, sfBuilderProvider, sfPathProvider) {
            var bootstrapDecorator = schemaFormDecoratorsProvider.decorator('bootstrapDecorator');
            var sfCompare = function (args) {
                if (args.form.compare) {
                    var ngModelElement = args.fieldFrag.querySelector('[ng-model]');
                    if (ngModelElement)
                        ngModelElement.setAttribute('sf-compare', '');
                }
            };
            angular.forEach(bootstrapDecorator, function (item, idx) {
                if (angular.isArray(item.builder)) {
                    item.builder.push(sfCompare);
                }
            });
        }
        return SchemaFormClass;
    }());
    var SchemaFormRun = (function () {
        function SchemaFormRun($templateCache) {
        }
        return SchemaFormRun;
    }());
    SchemaFormClass.$inject = [
        'schemaFormDecoratorsProvider',
        'schemaFormProvider',
        'sfBuilderProvider',
        'sfPathProvider'
    ];
    SchemaFormRun.$inject = ['$templateCache'];
    boot.config(SchemaFormClass).run(SchemaFormRun);
});

//# sourceMappingURL=schemaForm.js.map
