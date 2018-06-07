import boot = require('SeedModules.AngularUI/modules/boot');
import angular = require('angular');
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/form/extendFormFields';

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
    var base = '/SeedModules.AngularUI/modules/templates/';

    var simpleTransclusion = sfBuilderProvider.builders.simpleTransclusion;
    var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
    var ngModel = sfBuilderProvider.builders.ngModel;
    var sfField = sfBuilderProvider.builders.sfField;
    var condition = sfBuilderProvider.builders.condition;
    var array = sfBuilderProvider.builders.array;

    var row = function(args) {
      if (args.form.columns && args.form.columns.length > 0) {
        var rowContainer = args.fieldFrag.querySelector('.row');

        angular.forEach(args.form.columns, (column, idx) => {
          var div = document.createElement('div');
          div.className =
            'col-md-' +
            column.flex +
            ' col-sm-' +
            column.flex +
            ' col-xs-' +
            column.flex;

          var childFrag = args.build(
            column.items,
            args.path + '.columns[' + idx + '].items',
            args.state
          );

          div.appendChild(childFrag);
          rowContainer.appendChild(div);
        });
      }
    };

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.row,
      base + 'row.html',
      [row, condition]
    );

    // schemaFormDecoratorsProvider.createDirective(
    //   ExtendFormFields.row,
    //   base + 'row.html'
    // );
  }
}

boot.config(RowConfig).run([
  '$templateCache',
  ($templateCache: ng.ITemplateCacheService) => {
    $templateCache.put(
      '/SeedModules.AngularUI/modules/templates/row.html',
      '<div class="row"></div>'
    );
  }
]);
