define(["require", "exports", "SeedModules.AngularUI/modules/boot", "SeedModules.AngularUI/modules/configs/enums/extendFormFields"], function (require, exports, boot, extendFormFields_1) {
    "use strict";
    exports.__esModule = true;
    var base = '/SeedModules.AngularUI/modules/templates/form/';
    var PanelConfig = (function () {
        function PanelConfig(schemaFormDecoratorsProvider, sfBuilderProvider) {
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.panel, base + 'panel.html', [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.transclusion
            ]);
        }
        PanelConfig.$inject = ['schemaFormDecoratorsProvider', 'sfBuilderProvider'];
        return PanelConfig;
    }());
    boot.config(PanelConfig).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put(base + 'panel.html', '<div class="schema-form-panel panel panel-{{form.theme}} {{form.htmlClass}}"><div class="panel-heading"><span ng-bind="form.title"></span></div><div class="panel-body" sf-field-transclude="items"></div></div>');
        }
    ]);
});
//# sourceMappingURL=panel.js.map