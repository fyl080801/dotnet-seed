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
    var defaultBuilders = [
      sfBuilderProvider.builders.sfField,
      sfBuilderProvider.builders.ngModelOptions,
      sfBuilderProvider.builders.condition,
      sfBuilderProvider.builders.transclusion
    ];

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.panel,
      base + 'panel.html',
      defaultBuilders
    );

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.container,
      base + 'container.html',
      defaultBuilders
    );
  }
}

boot.config(PanelConfig).run([
  '$templateCache',
  ($templateCache: ng.ITemplateCacheService) => {
    $templateCache.put(
      base + 'panel.html',
      '<div class="schema-form-panel panel panel-{{form.theme}} {{form.htmlClass}}"><div ng-if="!form.notitle" class="panel-heading"> <i ng-if="form.titleIcon && form.titleIcon.length>0" class="{{form.titleIcon}}"></i> <span ng-bind="form.title"></span></div><div sf-field-transclude="items"></div></div>'
    );

    $templateCache.put(
      base + 'container.html',
      '<div class="panel-body {{form.htmlClass}}" sf-field-transclude="items"></div>'
    );
  }
]);
