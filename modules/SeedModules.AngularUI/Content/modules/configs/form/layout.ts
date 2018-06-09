import boot = require('SeedModules.AngularUI/modules/boot');
import angular = require('angular');
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';

var base = '/SeedModules.AngularUI/modules/templates/form/';

class RowConfig {
  static $inject = [
    'schemaFormDecoratorsProvider',
    'schemaFormProvider',
    'sfPathProvider',
    'sfBuilderProvider'
  ];
  constructor(
    schemaFormDecoratorsProvider: AngularUI.SchemaForm.ISchemaFormDecoratorsProvider,
    schemaFormProvider: AngularUI.SchemaForm.ISchemaFormProvider,
    sfPathProvider: AngularUI.SchemaForm.ISfPathProvider,
    sfBuilderProvider: AngularUI.SchemaForm.ISfBuilderProvider
  ) {
    var layoutDefaults = [
      sfBuilderProvider.builders.sfField,
      sfBuilderProvider.builders.ngModelOptions,
      sfBuilderProvider.builders.condition,
      sfBuilderProvider.builders.transclusion
    ];

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.row,
      base + 'row.html',
      layoutDefaults
    );

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.column,
      base + 'column.html',
      layoutDefaults
    );
  }
}

boot.config(RowConfig).run([
  '$templateCache',
  ($templateCache: ng.ITemplateCacheService) => {
    $templateCache.put(
      base + 'row.html',
      '<div class="row" sf-field-transclude="columns"></div>'
    );

    $templateCache.put(
      base + 'column.html',
      '<div class="col-md-{{form.flex}} col-lg-{{form.flex}} col-sm-{{form.flex}} col-xs-{{flex}}" sf-field-transclude="items"></div>'
    );
  }
]);
