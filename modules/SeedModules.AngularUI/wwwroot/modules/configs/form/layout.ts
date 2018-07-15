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

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      ExtendFormFields.navbar,
      base + 'navbar.html',
      layoutDefaults
    );
  }
}

boot.config(RowConfig).run([
  '$templateCache',
  ($templateCache: ng.ITemplateCacheService) => {
    $templateCache.put(
      base + 'row.html',
      '<div class="row" sf-field-transclude="items"></div>'
    );

    $templateCache.put(
      base + 'column.html',
      '<div class="col-md-{{form.flex}} col-lg-{{form.flex}} col-sm-{{form.flex}} col-xs-{{flex}}" sf-field-transclude="items"></div>'
    );

    $templateCache.put(
      base + 'navbar.html',
      '<div class="navbar navbar-{{form.theme}} {{form.htmlClass}}" style="margin: 0" sf-field-transclude="items"></div>'
    );

    $templateCache.put(
      'decorators/bootstrap/tabs.html',
      '<div ng-init="selected = { tab: 0 }" class="schema-form-tabs {{form.htmlClass}}"><ul class="nav nav-tabs"><li ng-repeat="tab in form.tabs" ng-disabled="form.readonly" ng-click="$event.preventDefault() || (selected.tab = $index)" ng-class="{active: selected.tab === $index}"><a href="#"> <i ng-if="tab.titleIcon && tab.titleIcon.length>0" class="{{tab.titleIcon}}"></i> {{ tab.title }}</a></li></ul><div class="tab-content {{form.fieldHtmlClass}}"></div></div>'
    );
  }
]);
