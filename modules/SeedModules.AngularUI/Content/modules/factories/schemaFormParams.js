define(["require", "exports", "angular"], function (require, exports, angular) {
    "use strict";
    exports.__esModule = true;
    function schemaFormParamsFactory(schemaFormDefaults) {
        var _this = this;
        var schemaFormParams = function (baseSchema, baseOptions) {
            var self = _this;
            var formSchema = {
                type: 'object',
                properties: {},
                required: []
            };
            angular.extend(formSchema, schemaFormDefaults.schema);
            var options = {};
            _this.options = function (newOptions) {
                if (!angular.isDefined(newOptions)) {
                    return options;
                }
                angular.extend(options, newOptions);
                return self;
            };
            _this.schema = function (newSchema) {
                if (!angular.isDefined(newSchema)) {
                    return formSchema;
                }
                formSchema.type = newSchema.type || 'object';
                formSchema.properties = newSchema.properties || {};
                formSchema.required = newSchema.required || [];
                return self;
            };
            _this.properties = function (propertiesDefine) {
                var currentSchema = self.schema();
                if (!angular.isDefined(propertiesDefine)) {
                    return currentSchema.properties;
                }
                currentSchema.properties = propertiesDefine;
                angular.forEach(currentSchema.properties, function (item, key) {
                    self.required(key, item.required);
                });
                return self;
            };
            _this.property = function (propertyName, propertyDefine) {
                var currentSchema = self.schema();
                if (!angular.isDefined(propertyDefine)) {
                    return currentSchema.properties[propertyName];
                }
                currentSchema.properties[propertyName] = propertyDefine;
                self.required(propertyName, propertyDefine.required);
                return self;
            };
            _this.required = function (propertyName, isRequired) {
                var currentSchema = self.schema();
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
                return self;
            };
            _this.options(schemaFormDefaults.options);
            _this.options(baseOptions);
            _this.schema(baseSchema);
            return _this;
        };
        return schemaFormParams;
    }
    exports.schemaFormParamsFactory = schemaFormParamsFactory;
});
//# sourceMappingURL=schemaFormParams.js.map