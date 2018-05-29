import angular = require('angular');
import schemaFormDefaults = require('SeedModules.AngularUI/modules/configs/ngTableDefaults');

export interface ISchemaFormParams {
  options(newOptions): ISchemaFormParams;
  options(): any;
  schema(newSchema): ISchemaFormParams;
  schema(): any;
  properties(propertiesDefine): ISchemaFormParams;
  properties(): any;
  property(propertyName, isRequired: boolean): ISchemaFormParams;
  property(propertyName): any;
  required(propertyName: string, isRequired: boolean): ISchemaFormParams;
  required(propertyName: string): boolean;
}

export class SchemaFormParams implements ISchemaFormParams {
  options(newOptions: any): ISchemaFormParams;
  options();
  options(newOptions?: any) {
    if (!angular.isDefined(newOptions)) {
      return this._options;
    }

    angular.extend(this._options, newOptions);
    return this;
  }

  schema(newSchema: any): ISchemaFormParams;
  schema();
  schema(newSchema?: any) {
    if (!angular.isDefined(newSchema)) {
      return this._formSchema;
    }

    this._formSchema.type = newSchema.type || 'object';
    this._formSchema.properties = newSchema.properties || {};
    this._formSchema.required = newSchema.required || [];
    return this as ISchemaFormParams;
  }

  properties(propertiesDefine: any): ISchemaFormParams;
  properties();
  properties(propertiesDefine?: any) {
    var currentSchema = this.schema();

    if (!angular.isDefined(propertiesDefine)) {
      return currentSchema.properties;
    }

    currentSchema.properties = propertiesDefine;
    angular.forEach(currentSchema.properties, function(item, key) {
      this.required(key, item.required);
    });
    return this;
  }

  property(propertyName: any, isRequired: boolean): ISchemaFormParams;
  property(propertyName: any);
  property(propertyName: any, isRequired?: boolean) {
    var currentSchema = this.schema();

    if (!angular.isDefined(propertyName)) {
      return currentSchema.properties[propertyName];
    }

    currentSchema.properties[propertyName] = propertyName;
    this.required(propertyName, propertyName.required);
    return this;
  }

  required(propertyName: string, isRequired: boolean): ISchemaFormParams;
  required(propertyName: string): boolean;
  required(propertyName: any, isRequired?: any) {
    var currentSchema = this.schema();
    var requiredIndex = currentSchema.required.indexOf(propertyName);

    if (!angular.isDefined(isRequired)) {
      return requiredIndex >= 0;
    }

    if (isRequired && requiredIndex < 0) {
      currentSchema.required.push(propertyName);
    } else if (requiredIndex >= 0) {
      currentSchema.required.splice(requiredIndex, 1);
    }
    return this as ISchemaFormParams;
  }

  private _formSchema = {
    type: 'object',
    properties: {},
    required: []
  };
  private _options = {};

  constructor(baseSchema?, baseOptions?) {
    angular.extend(this._formSchema, schemaFormDefaults.schema);
    this.options(schemaFormDefaults.options);
    this.options(baseOptions);
    this.schema(baseSchema);
  }
}

export function schemaFormParamsFactory(schemaFormDefaults) {
  // var schemaFormParams = (baseSchema, baseOptions): ISchemaFormParams => {
  //   var self = this;
  //   var formSchema = {
  //     type: 'object',
  //     properties: {},
  //     required: []
  //   };

  //   angular.extend(formSchema, schemaFormDefaults.schema);

  //   var options = {};

  //   this.options = function(newOptions) {
  //     if (!angular.isDefined(newOptions)) {
  //       return options;
  //     }

  //     angular.extend(options, newOptions);
  //     return self;
  //   };

  //   this.schema = function(newSchema) {};

  //   this.properties = function(propertiesDefine) {};

  //   this.property = function(propertyName, propertyDefine) {};

  //   this.required = function(propertyName, isRequired) {
  //     var currentSchema = self.schema();
  //     var requiredIndex = currentSchema.required.indexOf(propertyName);

  //     if (!angular.isDefined(isRequired)) {
  //       return requiredIndex >= 0;
  //     }

  //     if (isRequired && requiredIndex < 0) {
  //       currentSchema.required.push(propertyName);
  //     } else if (requiredIndex >= 0) {
  //       currentSchema.required.splice(requiredIndex, 1);
  //     }
  //     return self;
  //   };

  //   return this;
  // };

  var schemaFormParams = SchemaFormParams;

  return schemaFormParams;
}

schemaFormParamsFactory.$inject = [
  'SeedModules.AngularUI/modules/configs/schemaFormDefaults'
];
