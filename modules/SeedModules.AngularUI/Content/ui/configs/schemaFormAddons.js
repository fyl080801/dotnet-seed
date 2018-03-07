define(['SeedModules.AngularUI/ui/configs'], function(configs) {
  'use strict';

  configs
    .config([
      'schemaFormDecoratorsProvider',
      'sfBuilderProvider',
      'sfPathProvider',
      function(
        schemaFormDecoratorsProvider,
        sfBuilderProvider,
        sfPathProvider
      ) {
        var base = '/SeedModules.AngularUI/ui/templates/';

        var simpleTransclusion = sfBuilderProvider.builders.simpleTransclusion;
        var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
        var ngModel = sfBuilderProvider.builders.ngModel;
        var sfField = sfBuilderProvider.builders.sfField;
        var condition = sfBuilderProvider.builders.condition;
        var array = sfBuilderProvider.builders.array;

        var ngCompare = function(args) {
          args.fieldFrag.firstChild.setAttribute('ng-compare', '');
        };

        sfBuilderProvider.stdBuilders.push(ngCompare);

        schemaFormDecoratorsProvider.defineDecorator('seedDecorator', {});

        // schemaFormDecoratorsProvider.defineAddOn(
        //   'seedFormDecorators', // Name of the decorator you want to add to.
        //   'seedForm', // Form type that should render this add-on
        //   '', // Template name in $templateCache
        //   sfBuilderProvider.stdBuilders // List of builder functions to apply.
        // );
      }
    ])
    .run(['$templateCache', function($templateCache) {}]);
});
