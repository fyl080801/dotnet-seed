define(["require", "exports", "SeedModules.AngularUI/modules/boot", "SeedModules.AngularUI/modules/configs/form/extendFormFields"], function (require, exports, boot, extendFormFields_1) {
    "use strict";
    exports.__esModule = true;
    var SwitchFieldConfig = (function () {
        function SwitchFieldConfig(schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider) {
            var base = '/SeedModules.AngularUI/modules/templates/';
            var switchField = function (name, schema, options) {
                if (schema.type === 'boolean' && schema.format == 'html') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = extendFormFields_1.ExtendFormFields["switch"];
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };
            schemaFormProvider.defaults.boolean.push(switchField);
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', extendFormFields_1.ExtendFormFields["switch"], base + 'switchField.html');
            schemaFormDecoratorsProvider.createDirective(extendFormFields_1.ExtendFormFields["switch"], base + 'switchField.html');
        }
        SwitchFieldConfig.$inject = [
            'schemaFormDecoratorsProvider',
            'schemaFormProvider',
            'sfPathProvider'
        ];
        return SwitchFieldConfig;
    }());
    boot.config(SwitchFieldConfig);
});
//# sourceMappingURL=switchField.js.map