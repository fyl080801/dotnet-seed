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
      ExtendFormFields.table,
      base + 'table.html',
      defaultBuilders
    );
  }
}

boot.config(PanelConfig).run([
  '$templateCache',
  ($templateCache: ng.ITemplateCacheService) => {
    $templateCache.put(
      base + 'table.html',
      '<table class="table" ng-table-dynamic="form.tableParams with form.tableColumns"><tr ng-repeat="row in $data"><td ng-repeat="col in $columns">{{row[col.field]}}</td></tr></table>'
    );
  }
]);
