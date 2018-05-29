define(["require", "exports", "angular", "SeedModules.AngularUI/modules/configs/ngTableDefaults"], function (require, exports, angular, schemaFormDefaults) {
    "use strict";
    exports.__esModule = true;
    var SchemaFormParams = /** @class */ (function () {
        function SchemaFormParams(baseSchema, baseOptions) {
            this._formSchema = {
                type: 'object',
                properties: {},
                required: []
            };
            this._options = {};
            angular.extend(this._formSchema, schemaFormDefaults.schema);
            this.options(schemaFormDefaults.options);
            this.options(baseOptions);
            this.schema(baseSchema);
        }
        SchemaFormParams.prototype.options = function (newOptions) {
            if (!angular.isDefined(newOptions)) {
                return this._options;
            }
            angular.extend(this._options, newOptions);
            return this;
        };
        SchemaFormParams.prototype.schema = function (newSchema) {
            if (!angular.isDefined(newSchema)) {
                return this._formSchema;
            }
            this._formSchema.type = newSchema.type || 'object';
            this._formSchema.properties = newSchema.properties || {};
            this._formSchema.required = newSchema.required || [];
            return this;
        };
        SchemaFormParams.prototype.properties = function (propertiesDefine) {
            var currentSchema = this.schema();
            if (!angular.isDefined(propertiesDefine)) {
                return currentSchema.properties;
            }
            currentSchema.properties = propertiesDefine;
            angular.forEach(currentSchema.properties, function (item, key) {
                this.required(key, item.required);
            });
            return this;
        };
        SchemaFormParams.prototype.property = function (propertyName, isRequired) {
            var currentSchema = this.schema();
            if (!angular.isDefined(propertyName)) {
                return currentSchema.properties[propertyName];
            }
            currentSchema.properties[propertyName] = propertyName;
            this.required(propertyName, propertyName.required);
            return this;
        };
        SchemaFormParams.prototype.required = function (propertyName, isRequired) {
            var currentSchema = this.schema();
            var requiredIndex = currentSchema.required.indexOf(propertyName);
            if (!angular.isDefined(isRequired)) {
                return requiredIndex >= 0;
            }
            if (isRequired && requiredIndex < 0) {
                currentSchema.required.push(propertyName);
            }
            else if (requiredIndex >= 0) {
                currentSchema.required.splice(requiredIndex, 1);
            }
            return this;
        };
        return SchemaFormParams;
    }());
    exports.SchemaFormParams = SchemaFormParams;
    function schemaFormParamsFactory(schemaFormDefaults) {
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
    exports.schemaFormParamsFactory = schemaFormParamsFactory;
    schemaFormParamsFactory.$inject = [
        'SeedModules.AngularUI/modules/configs/schemaFormDefaults'
    ];
});
//# sourceMappingURL=schemaFormParams.js.map