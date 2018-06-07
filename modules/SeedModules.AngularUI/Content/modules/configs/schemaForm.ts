import boot = require('SeedModules.AngularUI/modules/boot');
import angular = require('angular');

class SchemaFormClass {
  constructor(
    schemaFormDecoratorsProvider,
    schemaFormProvider,
    sfBuilderProvider,
    sfPathProvider
  ) {
    // var base = '/SeedModules.AngularUI/modules/templates/';
    // var simpleTransclusion = sfBuilderProvider.builders.simpleTransclusion;
    // var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
    // var ngModel = sfBuilderProvider.builders.ngModel;
    // var sfField = sfBuilderProvider.builders.sfField;
    // var condition = sfBuilderProvider.builders.condition;
    // var array = sfBuilderProvider.builders.array;
    // var defaults = [sfField, ngModel, ngModelOptions, condition];

    var bootstrapDecorator = schemaFormDecoratorsProvider.decorator(
      'bootstrapDecorator'
    );

    var sfCompare = function(args) {
      if (args.form.compare) {
        var ngModelElement = args.fieldFrag.querySelector('[ng-model]');
        if (ngModelElement) ngModelElement.setAttribute('sf-compare', '');
      }
    };

    angular.forEach(bootstrapDecorator, function(item, idx) {
      if (angular.isArray(item.builder)) {
        item.builder.push(sfCompare);
      }
    });
  }
}

class SchemaFormRun {
  constructor($templateCache) {
    // $templateCache.put(
    //   '/SeedModules.AngularUI/modules/templates/simplecolor.html',
    //   'aaaaa'
    // );
  }
}

SchemaFormClass.$inject = [
  'schemaFormDecoratorsProvider',
  'schemaFormProvider',
  'sfBuilderProvider',
  'sfPathProvider'
];

SchemaFormRun.$inject = ['$templateCache'];

boot.config(SchemaFormClass).run(SchemaFormRun);
