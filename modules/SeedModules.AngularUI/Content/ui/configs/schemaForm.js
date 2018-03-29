define(['SeedModules.AngularUI/ui/configs'], function(configs) {
  'use strict';

  configs
    .config([
      'schemaFormDecoratorsProvider',
      'schemaFormProvider',
      'sfBuilderProvider',
      'sfPathProvider',
      function(
        schemaFormDecoratorsProvider,
        schemaFormProvider,
        sfBuilderProvider,
        sfPathProvider
      ) {
        // var base = '/SeedModules.AngularUI/ui/templates/';
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
    ])
    .run([
      '$templateCache',
      function($templateCache) {
        // $templateCache.put(
        //   '/SeedModules.AngularUI/ui/templates/simplecolor.html',
        //   'aaaaa'
        // );
      }
    ]);
});
