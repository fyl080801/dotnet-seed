import mod = require('SeedModules.AngularUI/modules/module');
import angular = require('angular');

export interface ISchemaFormParams {
  options(newOptions): ISchemaFormParams | any;
  schema(newSchema): ISchemaFormParams | any;
  properties(propertiesDefine): ISchemaFormParams | any;
  property(propertyName, isRequired): ISchemaFormParams | any;
}

export function schemaFormParamsFactory(schemaFormDefaults) {
  var schemaFormParams = (baseSchema, baseOptions): ISchemaFormParams => {
    var self = this;
    var formSchema = {
      type: 'object',
      properties: {},
      required: []
    };

    angular.extend(formSchema, schemaFormDefaults.schema);

    var options = {};

    this.options = function(newOptions) {
      if (!angular.isDefined(newOptions)) {
        return options;
      }

      angular.extend(options, newOptions);
      return self;
    };

    this.schema = function(newSchema) {
      if (!angular.isDefined(newSchema)) {
        return formSchema;
      }

      formSchema.type = newSchema.type || 'object';
      formSchema.properties = newSchema.properties || {};
      formSchema.required = newSchema.required || [];
      return self;
    };

    this.properties = function(propertiesDefine) {
      var currentSchema = self.schema();

      if (!angular.isDefined(propertiesDefine)) {
        return currentSchema.properties;
      }

      currentSchema.properties = propertiesDefine;
      angular.forEach(currentSchema.properties, function(item, key) {
        self.required(key, item.required);
      });
      return self;
    };

    this.property = function(propertyName, propertyDefine) {
      var currentSchema = self.schema();

      if (!angular.isDefined(propertyDefine)) {
        return currentSchema.properties[propertyName];
      }

      currentSchema.properties[propertyName] = propertyDefine;
      self.required(propertyName, propertyDefine.required);
      return self;
    };

    this.required = function(propertyName, isRequired) {
      var currentSchema = self.schema();
      var requiredIndex = currentSchema.required.indexOf(propertyName);

      if (!angular.isDefined(isRequired)) {
        return requiredIndex >= 0;
      }

      if (isRequired && requiredIndex < 0) {
        currentSchema.required.push(propertyName);
      } else if (requiredIndex >= 0) {
        currentSchema.required.splice(requiredIndex, 1);
      }
      return self;
    };

    this.options(schemaFormDefaults.options);
    this.options(baseOptions);
    this.schema(baseSchema);

    return this;
  };

  return schemaFormParams;
}

schemaFormParamsFactory.$inject = [
  'SeedModules.AngularUI/modules/configs/schemaFormDefaults'
];

mod.factory(
  'SeedModules.AngularUI/modules/factories/schemaFormParams',
  schemaFormParamsFactory
);
