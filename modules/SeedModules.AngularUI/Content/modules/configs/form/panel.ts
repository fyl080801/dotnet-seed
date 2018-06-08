import boot = require('SeedModules.AngularUI/modules/boot');
import angular = require('angular');
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';

var base = '/SeedModules.AngularUI/modules/templates/form/';

class PanelConfig {
  static $inject = ['schemaFormDecoratorsProvider', 'sfBuilderProvider'];
  constructor(
    schemaFormDecoratorsProvider: AngularUI.SchemaForm.ISchemaFormDecoratorsProvider,
    sfBuilderProvider: AngularUI.SchemaForm.ISfBuilderProvider
  ) {
    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.panel,
      base + 'panel.html',
      [
        sfBuilderProvider.builders.sfField,
        sfBuilderProvider.builders.ngModelOptions,
        sfBuilderProvider.builders.condition,
        sfBuilderProvider.builders.transclusion
      ]
    );
  }
}

boot.config(PanelConfig).run([
  '$templateCache',
  ($templateCache: ng.ITemplateCacheService) => {
    $templateCache.put(
      base + 'panel.html',
      '<div class="schema-form-panel panel panel-{{form.theme}} {{form.htmlClass}}"><div class="panel-heading"><span ng-bind="form.title"></span></div><div class="panel-body" sf-field-transclude="items"></div></div>'
    );
  }
]);
