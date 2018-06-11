import boot = require('SeedModules.AngularUI/modules/boot');
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';

class SwitchFieldConfig {
  static $inject = [
    'schemaFormDecoratorsProvider',
    'schemaFormProvider',
    'sfPathProvider'
  ];
  constructor(
    schemaFormDecoratorsProvider: AngularUI.SchemaForm.ISchemaFormDecoratorsProvider,
    schemaFormProvider: AngularUI.SchemaForm.ISchemaFormProvider,
    sfPathProvider: AngularUI.SchemaForm.ISfPathProvider
  ) {
    var base = '/SeedModules.AngularUI/modules/templates/form/';

    var switchField = (name, schema, options) => {
      if (schema.type === 'boolean' && schema.format == 'html') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = ExtendFormFields.switch;
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.boolean.push(switchField);

    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      ExtendFormFields.switch,
      base + 'switchField.html'
    );

    schemaFormDecoratorsProvider.createDirective(
      ExtendFormFields.switch,
      base + 'switchField.html'
    );
  }
}

boot.config(SwitchFieldConfig);
