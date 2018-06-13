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
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.panel, base + 'panel.html', defaultBuilders);
            schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', extendFormFields_1.ExtendFormFields.container, base + 'container.html', defaultBuilders);
        }
        PanelConfig.$inject = ['schemaFormDecoratorsProvider', 'sfBuilderProvider'];
        return PanelConfig;
    }());
    boot.config(PanelConfig).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put(base + 'panel.html', '<div class="schema-form-panel panel panel-{{form.theme}} {{form.htmlClass}}"><div ng-if="!form.notitle" class="panel-heading"> <i ng-if="form.titleIcon && form.titleIcon.length>0" class="{{form.titleIcon}}"></i> <span ng-bind="form.title"></span></div><div sf-field-transclude="items"></div></div>');
            $templateCache.put(base + 'container.html', '<div class="panel-body {{form.htmlClass}}" sf-field-transclude="items"></div>');
        }
    ]);
});
//# sourceMappingURL=panel.js.map