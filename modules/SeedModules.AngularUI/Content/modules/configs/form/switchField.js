define([
  'SeedModules.AngularUI/modules/configs',
  'schema-form-bootstrap'
], function(configs) {
  'use strict';

  angular.module('schemaForm').config([
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
      var base = '/SeedModules.AngularUI/modules/templates/';

      var switchField = function(name, schema, options) {
        if (schema.type === 'boolean' && schema.format == 'html') {
          var f = schemaFormProvider.stdFormObj(name, schema, options);
          f.key = options.path;
          f.type = 'switch';
          options.lookup[sfPathProvider.stringify(options.path)] = f;
          return f;
        }
      };

      schemaFormProvider.defaults.boolean.push(switchField);

      schemaFormDecoratorsProvider.addMapping(
        'bootstrapDecorator',
        'switch',
        base + 'switchField.html'
      );

      schemaFormDecoratorsProvider.createDirective(
        'switch',
        base + 'switchField.html'
      );
    }
  ]);
});
