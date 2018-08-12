'use strict';
;
!function (undefined) {
    var ObjectPath = {
        parse: function (str) {
            if (typeof str !== 'string') {
                throw new TypeError('ObjectPath.parse must be passed a string');
            }
            var i = 0;
            var parts = [];
            var d, b, q, c;
            while (i < str.length) {
                d = str.indexOf('.', i);
                b = str.indexOf('[', i);
                if (d === -1 && b === -1) {
                    parts.push(str.slice(i, str.length));
                    i = str.length;
                } else if (b === -1 || d !== -1 && d < b) {
                    parts.push(str.slice(i, d));
                    i = d + 1;
                } else {
                    if (b > i) {
                        parts.push(str.slice(i, b));
                        i = b;
                    }
                    q = str.slice(b + 1, b + 2);
                    if (q !== '"' && q !== '\'') {
                        c = str.indexOf(']', b);
                        if (c === -1)
                            c = str.length;
                        parts.push(str.slice(i + 1, c));
                        i = str.slice(c + 1, c + 2) === '.' ? c + 2 : c + 1;
                    } else {
                        c = str.indexOf(q + ']', b);
                        if (c === -1)
                            c = str.length;
                        while (str.slice(c - 1, c) === '\\' && b < str.length) {
                            b++;
                            c = str.indexOf(q + ']', b);
                        }
                        parts.push(str.slice(i + 2, c).replace(new RegExp('\\' + q, 'g'), q));
                        i = str.slice(c + 2, c + 3) === '.' ? c + 3 : c + 2;
                    }
                }
            }
            return parts;
        },
        stringify: function (arr, quote) {
            if (!Array.isArray(arr))
                arr = [arr.toString()];
            quote = quote === '"' ? '"' : '\'';
            return arr.map(function (n) {
                return '[' + quote + n.toString().replace(new RegExp(quote, 'g'), '\\' + quote) + quote + ']';
            }).join('');
        },
        normalize: function (data, quote) {
            return ObjectPath.stringify(Array.isArray(data) ? data : ObjectPath.parse(data), quote);
        },
        registerModule: function (angular) {
            angular.module('ObjectPath', []).provider('ObjectPath', function () {
                this.parse = ObjectPath.parse;
                this.stringify = ObjectPath.stringify;
                this.normalize = ObjectPath.normalize;
                this.$get = function () {
                    return ObjectPath;
                };
            });
        }
    };
    if (typeof define === 'function' && define.amd) {
        define('objectpath', [], function () {
            return ObjectPath;
        });
    } else if (typeof exports === 'object') {
        exports.ObjectPath = ObjectPath;
    } else {
        window.ObjectPath = ObjectPath;
    }
}();
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('tv4', [], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.tv4 = factory();
    }
}(this, function () {
    if (!Object.keys) {
        Object.keys = function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'), dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ], dontEnumsLength = dontEnums.length;
            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
                    throw new TypeError('Object.keys called on non-object');
                }
                var result = [];
                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }
                if (hasDontEnumBug) {
                    for (var i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }();
    }
    if (!Object.create) {
        Object.create = function () {
            function F() {
            }
            return function (o) {
                if (arguments.length !== 1) {
                    throw new Error('Object.create implementation only accepts one parameter.');
                }
                F.prototype = o;
                return new F();
            };
        }();
    }
    if (!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === '[object Array]';
        };
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement) {
            if (this === null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n !== n) {
                    n = 0;
                } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
    }
    if (!Object.isFrozen) {
        Object.isFrozen = function (obj) {
            var key = 'tv4_test_frozen_key';
            while (obj.hasOwnProperty(key)) {
                key += Math.random();
            }
            try {
                obj[key] = true;
                delete obj[key];
                return false;
            } catch (e) {
                return true;
            }
        };
    }
    var ValidatorContext = function ValidatorContext(parent, collectMultiple, errorMessages, checkRecursive, trackUnknownProperties) {
        this.missing = [];
        this.missingMap = {};
        this.formatValidators = parent ? Object.create(parent.formatValidators) : {};
        this.schemas = parent ? Object.create(parent.schemas) : {};
        this.collectMultiple = collectMultiple;
        this.errors = [];
        this.handleError = collectMultiple ? this.collectError : this.returnError;
        if (checkRecursive) {
            this.checkRecursive = true;
            this.scanned = [];
            this.scannedFrozen = [];
            this.scannedFrozenSchemas = [];
            this.scannedFrozenValidationErrors = [];
            this.validatedSchemasKey = 'tv4_validation_id';
            this.validationErrorsKey = 'tv4_validation_errors_id';
        }
        if (trackUnknownProperties) {
            this.trackUnknownProperties = true;
            this.knownPropertyPaths = {};
            this.unknownPropertyPaths = {};
        }
        this.errorMessages = errorMessages;
        this.definedKeywords = {};
        if (parent) {
            for (var key in parent.definedKeywords) {
                this.definedKeywords[key] = parent.definedKeywords[key].slice(0);
            }
        }
    };
    ValidatorContext.prototype.defineKeyword = function (keyword, keywordFunction) {
        this.definedKeywords[keyword] = this.definedKeywords[keyword] || [];
        this.definedKeywords[keyword].push(keywordFunction);
    };
    ValidatorContext.prototype.createError = function (code, messageParams, dataPath, schemaPath, subErrors) {
        var messageTemplate = this.errorMessages[code] || ErrorMessagesDefault[code];
        if (typeof messageTemplate !== 'string') {
            return new ValidationError(code, 'Unknown error code ' + code + ': ' + JSON.stringify(messageParams), dataPath, schemaPath, subErrors);
        }
        var message = messageTemplate.replace(/\{([^{}]*)\}/g, function (whole, varName) {
            var subValue = messageParams[varName];
            return typeof subValue === 'string' || typeof subValue === 'number' ? subValue : whole;
        });
        return new ValidationError(code, message, dataPath, schemaPath, subErrors);
    };
    ValidatorContext.prototype.returnError = function (error) {
        return error;
    };
    ValidatorContext.prototype.collectError = function (error) {
        if (error) {
            this.errors.push(error);
        }
        return null;
    };
    ValidatorContext.prototype.prefixErrors = function (startIndex, dataPath, schemaPath) {
        for (var i = startIndex; i < this.errors.length; i++) {
            this.errors[i] = this.errors[i].prefixWith(dataPath, schemaPath);
        }
        return this;
    };
    ValidatorContext.prototype.banUnknownProperties = function () {
        for (var unknownPath in this.unknownPropertyPaths) {
            var error = this.createError(ErrorCodes.UNKNOWN_PROPERTY, { path: unknownPath }, unknownPath, '');
            var result = this.handleError(error);
            if (result) {
                return result;
            }
        }
        return null;
    };
    ValidatorContext.prototype.addFormat = function (format, validator) {
        if (typeof format === 'object') {
            for (var key in format) {
                this.addFormat(key, format[key]);
            }
            return this;
        }
        this.formatValidators[format] = validator;
    };
    ValidatorContext.prototype.resolveRefs = function (schema, urlHistory) {
        if (schema['$ref'] !== undefined) {
            urlHistory = urlHistory || {};
            if (urlHistory[schema['$ref']]) {
                return this.createError(ErrorCodes.CIRCULAR_REFERENCE, { urls: Object.keys(urlHistory).join(', ') }, '', '');
            }
            urlHistory[schema['$ref']] = true;
            schema = this.getSchema(schema['$ref'], urlHistory);
        }
        return schema;
    };
    ValidatorContext.prototype.getSchema = function (url, urlHistory) {
        var schema;
        if (this.schemas[url] !== undefined) {
            schema = this.schemas[url];
            return this.resolveRefs(schema, urlHistory);
        }
        var baseUrl = url;
        var fragment = '';
        if (url.indexOf('#') !== -1) {
            fragment = url.substring(url.indexOf('#') + 1);
            baseUrl = url.substring(0, url.indexOf('#'));
        }
        if (typeof this.schemas[baseUrl] === 'object') {
            schema = this.schemas[baseUrl];
            var pointerPath = decodeURIComponent(fragment);
            if (pointerPath === '') {
                return this.resolveRefs(schema, urlHistory);
            } else if (pointerPath.charAt(0) !== '/') {
                return undefined;
            }
            var parts = pointerPath.split('/').slice(1);
            for (var i = 0; i < parts.length; i++) {
                var component = parts[i].replace(/~1/g, '/').replace(/~0/g, '~');
                if (schema[component] === undefined) {
                    schema = undefined;
                    break;
                }
                schema = schema[component];
            }
            if (schema !== undefined) {
                return this.resolveRefs(schema, urlHistory);
            }
        }
        if (this.missing[baseUrl] === undefined) {
            this.missing.push(baseUrl);
            this.missing[baseUrl] = baseUrl;
            this.missingMap[baseUrl] = baseUrl;
        }
    };
    ValidatorContext.prototype.searchSchemas = function (schema, url) {
        if (schema && typeof schema === 'object') {
            if (typeof schema.id === 'string') {
                if (isTrustedUrl(url, schema.id)) {
                    if (this.schemas[schema.id] === undefined) {
                        this.schemas[schema.id] = schema;
                    }
                }
            }
            for (var key in schema) {
                if (key !== 'enum') {
                    if (typeof schema[key] === 'object') {
                        this.searchSchemas(schema[key], url);
                    } else if (key === '$ref') {
                        var uri = getDocumentUri(schema[key]);
                        if (uri && this.schemas[uri] === undefined && this.missingMap[uri] === undefined) {
                            this.missingMap[uri] = uri;
                        }
                    }
                }
            }
        }
    };
    ValidatorContext.prototype.addSchema = function (url, schema) {
        if (typeof url !== 'string' || typeof schema === 'undefined') {
            if (typeof url === 'object' && typeof url.id === 'string') {
                schema = url;
                url = schema.id;
            } else {
                return;
            }
        }
        if (url = getDocumentUri(url) + '#') {
            url = getDocumentUri(url);
        }
        this.schemas[url] = schema;
        delete this.missingMap[url];
        normSchema(schema, url);
        this.searchSchemas(schema, url);
    };
    ValidatorContext.prototype.getSchemaMap = function () {
        var map = {};
        for (var key in this.schemas) {
            map[key] = this.schemas[key];
        }
        return map;
    };
    ValidatorContext.prototype.getSchemaUris = function (filterRegExp) {
        var list = [];
        for (var key in this.schemas) {
            if (!filterRegExp || filterRegExp.test(key)) {
                list.push(key);
            }
        }
        return list;
    };
    ValidatorContext.prototype.getMissingUris = function (filterRegExp) {
        var list = [];
        for (var key in this.missingMap) {
            if (!filterRegExp || filterRegExp.test(key)) {
                list.push(key);
            }
        }
        return list;
    };
    ValidatorContext.prototype.dropSchemas = function () {
        this.schemas = {};
        this.reset();
    };
    ValidatorContext.prototype.reset = function () {
        this.missing = [];
        this.missingMap = {};
        this.errors = [];
    };
    ValidatorContext.prototype.validateAll = function (data, schema, dataPathParts, schemaPathParts, dataPointerPath) {
        var topLevel;
        schema = this.resolveRefs(schema);
        if (!schema) {
            return null;
        } else if (schema instanceof ValidationError) {
            this.errors.push(schema);
            return schema;
        }
        var startErrorCount = this.errors.length;
        var frozenIndex, scannedFrozenSchemaIndex = null, scannedSchemasIndex = null;
        if (this.checkRecursive && data && typeof data === 'object') {
            topLevel = !this.scanned.length;
            if (data[this.validatedSchemasKey]) {
                var schemaIndex = data[this.validatedSchemasKey].indexOf(schema);
                if (schemaIndex !== -1) {
                    this.errors = this.errors.concat(data[this.validationErrorsKey][schemaIndex]);
                    return null;
                }
            }
            if (Object.isFrozen(data)) {
                frozenIndex = this.scannedFrozen.indexOf(data);
                if (frozenIndex !== -1) {
                    var frozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].indexOf(schema);
                    if (frozenSchemaIndex !== -1) {
                        this.errors = this.errors.concat(this.scannedFrozenValidationErrors[frozenIndex][frozenSchemaIndex]);
                        return null;
                    }
                }
            }
            this.scanned.push(data);
            if (Object.isFrozen(data)) {
                if (frozenIndex === -1) {
                    frozenIndex = this.scannedFrozen.length;
                    this.scannedFrozen.push(data);
                    this.scannedFrozenSchemas.push([]);
                }
                scannedFrozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].length;
                this.scannedFrozenSchemas[frozenIndex][scannedFrozenSchemaIndex] = schema;
                this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = [];
            } else {
                if (!data[this.validatedSchemasKey]) {
                    try {
                        Object.defineProperty(data, this.validatedSchemasKey, {
                            value: [],
                            configurable: true
                        });
                        Object.defineProperty(data, this.validationErrorsKey, {
                            value: [],
                            configurable: true
                        });
                    } catch (e) {
                        data[this.validatedSchemasKey] = [];
                        data[this.validationErrorsKey] = [];
                    }
                }
                scannedSchemasIndex = data[this.validatedSchemasKey].length;
                data[this.validatedSchemasKey][scannedSchemasIndex] = schema;
                data[this.validationErrorsKey][scannedSchemasIndex] = [];
            }
        }
        var errorCount = this.errors.length;
        var error = this.validateBasic(data, schema, dataPointerPath) || this.validateNumeric(data, schema, dataPointerPath) || this.validateString(data, schema, dataPointerPath) || this.validateArray(data, schema, dataPointerPath) || this.validateObject(data, schema, dataPointerPath) || this.validateCombinations(data, schema, dataPointerPath) || this.validateFormat(data, schema, dataPointerPath) || this.validateDefinedKeywords(data, schema, dataPointerPath) || null;
        if (topLevel) {
            while (this.scanned.length) {
                var item = this.scanned.pop();
                delete item[this.validatedSchemasKey];
            }
            this.scannedFrozen = [];
            this.scannedFrozenSchemas = [];
        }
        if (error || errorCount !== this.errors.length) {
            while (dataPathParts && dataPathParts.length || schemaPathParts && schemaPathParts.length) {
                var dataPart = dataPathParts && dataPathParts.length ? '' + dataPathParts.pop() : null;
                var schemaPart = schemaPathParts && schemaPathParts.length ? '' + schemaPathParts.pop() : null;
                if (error) {
                    error = error.prefixWith(dataPart, schemaPart);
                }
                this.prefixErrors(errorCount, dataPart, schemaPart);
            }
        }
        if (scannedFrozenSchemaIndex !== null) {
            this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = this.errors.slice(startErrorCount);
        } else if (scannedSchemasIndex !== null) {
            data[this.validationErrorsKey][scannedSchemasIndex] = this.errors.slice(startErrorCount);
        }
        return this.handleError(error);
    };
    ValidatorContext.prototype.validateFormat = function (data, schema) {
        if (typeof schema.format !== 'string' || !this.formatValidators[schema.format]) {
            return null;
        }
        var errorMessage = this.formatValidators[schema.format].call(null, data, schema);
        if (typeof errorMessage === 'string' || typeof errorMessage === 'number') {
            return this.createError(ErrorCodes.FORMAT_CUSTOM, { message: errorMessage }).prefixWith(null, 'format');
        } else if (errorMessage && typeof errorMessage === 'object') {
            return this.createError(ErrorCodes.FORMAT_CUSTOM, { message: errorMessage.message || '?' }, errorMessage.dataPath || null, errorMessage.schemaPath || '/format');
        }
        return null;
    };
    ValidatorContext.prototype.validateDefinedKeywords = function (data, schema) {
        for (var key in this.definedKeywords) {
            var validationFunctions = this.definedKeywords[key];
            for (var i = 0; i < validationFunctions.length; i++) {
                var func = validationFunctions[i];
                var result = func(data, schema[key], schema);
                if (typeof result === 'string' || typeof result === 'number') {
                    return this.createError(ErrorCodes.KEYWORD_CUSTOM, {
                        key: key,
                        message: result
                    }).prefixWith(null, 'format');
                } else if (result && typeof result === 'object') {
                    var code = result.code || ErrorCodes.KEYWORD_CUSTOM;
                    if (typeof code === 'string') {
                        if (!ErrorCodes[code]) {
                            throw new Error('Undefined error code (use defineError): ' + code);
                        }
                        code = ErrorCodes[code];
                    }
                    var messageParams = typeof result.message === 'object' ? result.message : {
                        key: key,
                        message: result.message || '?'
                    };
                    var schemaPath = result.schemaPath || '/' + key.replace(/~/g, '~0').replace(/\//g, '~1');
                    return this.createError(code, messageParams, result.dataPath || null, schemaPath);
                }
            }
        }
        return null;
    };
    function recursiveCompare(A, B) {
        if (A === B) {
            return true;
        }
        if (typeof A === 'object' && typeof B === 'object') {
            if (Array.isArray(A) !== Array.isArray(B)) {
                return false;
            } else if (Array.isArray(A)) {
                if (A.length !== B.length) {
                    return false;
                }
                for (var i = 0; i < A.length; i++) {
                    if (!recursiveCompare(A[i], B[i])) {
                        return false;
                    }
                }
            } else {
                var key;
                for (key in A) {
                    if (B[key] === undefined && A[key] !== undefined) {
                        return false;
                    }
                }
                for (key in B) {
                    if (A[key] === undefined && B[key] !== undefined) {
                        return false;
                    }
                }
                for (key in A) {
                    if (!recursiveCompare(A[key], B[key])) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
    ValidatorContext.prototype.validateBasic = function validateBasic(data, schema, dataPointerPath) {
        var error;
        if (error = this.validateType(data, schema, dataPointerPath)) {
            return error.prefixWith(null, 'type');
        }
        if (error = this.validateEnum(data, schema, dataPointerPath)) {
            return error.prefixWith(null, 'type');
        }
        return null;
    };
    ValidatorContext.prototype.validateType = function validateType(data, schema) {
        if (schema.type === undefined) {
            return null;
        }
        var dataType = typeof data;
        if (data === null) {
            dataType = 'null';
        } else if (Array.isArray(data)) {
            dataType = 'array';
        }
        var allowedTypes = schema.type;
        if (typeof allowedTypes !== 'object') {
            allowedTypes = [allowedTypes];
        }
        for (var i = 0; i < allowedTypes.length; i++) {
            var type = allowedTypes[i];
            if (type === dataType || type === 'integer' && dataType === 'number' && data % 1 === 0) {
                return null;
            }
        }
        return this.createError(ErrorCodes.INVALID_TYPE, {
            type: dataType,
            expected: allowedTypes.join('/')
        });
    };
    ValidatorContext.prototype.validateEnum = function validateEnum(data, schema) {
        if (schema['enum'] === undefined) {
            return null;
        }
        for (var i = 0; i < schema['enum'].length; i++) {
            var enumVal = schema['enum'][i];
            if (recursiveCompare(data, enumVal)) {
                return null;
            }
        }
        return this.createError(ErrorCodes.ENUM_MISMATCH, { value: typeof JSON !== 'undefined' ? JSON.stringify(data) : data });
    };
    ValidatorContext.prototype.validateNumeric = function validateNumeric(data, schema, dataPointerPath) {
        return this.validateMultipleOf(data, schema, dataPointerPath) || this.validateMinMax(data, schema, dataPointerPath) || null;
    };
    ValidatorContext.prototype.validateMultipleOf = function validateMultipleOf(data, schema) {
        var multipleOf = schema.multipleOf || schema.divisibleBy;
        if (multipleOf === undefined) {
            return null;
        }
        if (typeof data === 'number') {
            if (data % multipleOf !== 0) {
                return this.createError(ErrorCodes.NUMBER_MULTIPLE_OF, {
                    value: data,
                    multipleOf: multipleOf
                });
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateMinMax = function validateMinMax(data, schema) {
        if (typeof data !== 'number') {
            return null;
        }
        if (schema.minimum !== undefined) {
            if (data < schema.minimum) {
                return this.createError(ErrorCodes.NUMBER_MINIMUM, {
                    value: data,
                    minimum: schema.minimum
                }).prefixWith(null, 'minimum');
            }
            if (schema.exclusiveMinimum && data === schema.minimum) {
                return this.createError(ErrorCodes.NUMBER_MINIMUM_EXCLUSIVE, {
                    value: data,
                    minimum: schema.minimum
                }).prefixWith(null, 'exclusiveMinimum');
            }
        }
        if (schema.maximum !== undefined) {
            if (data > schema.maximum) {
                return this.createError(ErrorCodes.NUMBER_MAXIMUM, {
                    value: data,
                    maximum: schema.maximum
                }).prefixWith(null, 'maximum');
            }
            if (schema.exclusiveMaximum && data === schema.maximum) {
                return this.createError(ErrorCodes.NUMBER_MAXIMUM_EXCLUSIVE, {
                    value: data,
                    maximum: schema.maximum
                }).prefixWith(null, 'exclusiveMaximum');
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateString = function validateString(data, schema, dataPointerPath) {
        return this.validateStringLength(data, schema, dataPointerPath) || this.validateStringPattern(data, schema, dataPointerPath) || null;
    };
    ValidatorContext.prototype.validateStringLength = function validateStringLength(data, schema) {
        if (typeof data !== 'string') {
            return null;
        }
        if (schema.minLength !== undefined) {
            if (data.length < schema.minLength) {
                return this.createError(ErrorCodes.STRING_LENGTH_SHORT, {
                    length: data.length,
                    minimum: schema.minLength
                }).prefixWith(null, 'minLength');
            }
        }
        if (schema.maxLength !== undefined) {
            if (data.length > schema.maxLength) {
                return this.createError(ErrorCodes.STRING_LENGTH_LONG, {
                    length: data.length,
                    maximum: schema.maxLength
                }).prefixWith(null, 'maxLength');
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateStringPattern = function validateStringPattern(data, schema) {
        if (typeof data !== 'string' || schema.pattern === undefined) {
            return null;
        }
        var regexp = new RegExp(schema.pattern);
        if (!regexp.test(data)) {
            return this.createError(ErrorCodes.STRING_PATTERN, { pattern: schema.pattern }).prefixWith(null, 'pattern');
        }
        return null;
    };
    ValidatorContext.prototype.validateArray = function validateArray(data, schema, dataPointerPath) {
        if (!Array.isArray(data)) {
            return null;
        }
        return this.validateArrayLength(data, schema, dataPointerPath) || this.validateArrayUniqueItems(data, schema, dataPointerPath) || this.validateArrayItems(data, schema, dataPointerPath) || null;
    };
    ValidatorContext.prototype.validateArrayLength = function validateArrayLength(data, schema) {
        var error;
        if (schema.minItems !== undefined) {
            if (data.length < schema.minItems) {
                error = this.createError(ErrorCodes.ARRAY_LENGTH_SHORT, {
                    length: data.length,
                    minimum: schema.minItems
                }).prefixWith(null, 'minItems');
                if (this.handleError(error)) {
                    return error;
                }
            }
        }
        if (schema.maxItems !== undefined) {
            if (data.length > schema.maxItems) {
                error = this.createError(ErrorCodes.ARRAY_LENGTH_LONG, {
                    length: data.length,
                    maximum: schema.maxItems
                }).prefixWith(null, 'maxItems');
                if (this.handleError(error)) {
                    return error;
                }
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateArrayUniqueItems = function validateArrayUniqueItems(data, schema) {
        if (schema.uniqueItems) {
            for (var i = 0; i < data.length; i++) {
                for (var j = i + 1; j < data.length; j++) {
                    if (recursiveCompare(data[i], data[j])) {
                        var error = this.createError(ErrorCodes.ARRAY_UNIQUE, {
                            match1: i,
                            match2: j
                        }).prefixWith(null, 'uniqueItems');
                        if (this.handleError(error)) {
                            return error;
                        }
                    }
                }
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateArrayItems = function validateArrayItems(data, schema, dataPointerPath) {
        if (schema.items === undefined) {
            return null;
        }
        var error, i;
        if (Array.isArray(schema.items)) {
            for (i = 0; i < data.length; i++) {
                if (i < schema.items.length) {
                    if (error = this.validateAll(data[i], schema.items[i], [i], [
                            'items',
                            i
                        ], dataPointerPath + '/' + i)) {
                        return error;
                    }
                } else if (schema.additionalItems !== undefined) {
                    if (typeof schema.additionalItems === 'boolean') {
                        if (!schema.additionalItems) {
                            error = this.createError(ErrorCodes.ARRAY_ADDITIONAL_ITEMS, {}).prefixWith('' + i, 'additionalItems');
                            if (this.handleError(error)) {
                                return error;
                            }
                        }
                    } else if (error = this.validateAll(data[i], schema.additionalItems, [i], ['additionalItems'], dataPointerPath + '/' + i)) {
                        return error;
                    }
                }
            }
        } else {
            for (i = 0; i < data.length; i++) {
                if (error = this.validateAll(data[i], schema.items, [i], ['items'], dataPointerPath + '/' + i)) {
                    return error;
                }
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateObject = function validateObject(data, schema, dataPointerPath) {
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            return null;
        }
        return this.validateObjectMinMaxProperties(data, schema, dataPointerPath) || this.validateObjectRequiredProperties(data, schema, dataPointerPath) || this.validateObjectProperties(data, schema, dataPointerPath) || this.validateObjectDependencies(data, schema, dataPointerPath) || null;
    };
    ValidatorContext.prototype.validateObjectMinMaxProperties = function validateObjectMinMaxProperties(data, schema) {
        var keys = Object.keys(data);
        var error;
        if (schema.minProperties !== undefined) {
            if (keys.length < schema.minProperties) {
                error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MINIMUM, {
                    propertyCount: keys.length,
                    minimum: schema.minProperties
                }).prefixWith(null, 'minProperties');
                if (this.handleError(error)) {
                    return error;
                }
            }
        }
        if (schema.maxProperties !== undefined) {
            if (keys.length > schema.maxProperties) {
                error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MAXIMUM, {
                    propertyCount: keys.length,
                    maximum: schema.maxProperties
                }).prefixWith(null, 'maxProperties');
                if (this.handleError(error)) {
                    return error;
                }
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateObjectRequiredProperties = function validateObjectRequiredProperties(data, schema) {
        if (schema.required !== undefined) {
            for (var i = 0; i < schema.required.length; i++) {
                var key = schema.required[i];
                if (data[key] === undefined) {
                    var error = this.createError(ErrorCodes.OBJECT_REQUIRED, { key: key }).prefixWith(null, '' + i).prefixWith(null, 'required');
                    if (this.handleError(error)) {
                        return error;
                    }
                }
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateObjectProperties = function validateObjectProperties(data, schema, dataPointerPath) {
        var error;
        for (var key in data) {
            var keyPointerPath = dataPointerPath + '/' + key.replace(/~/g, '~0').replace(/\//g, '~1');
            var foundMatch = false;
            if (schema.properties !== undefined && schema.properties[key] !== undefined) {
                foundMatch = true;
                if (error = this.validateAll(data[key], schema.properties[key], [key], [
                        'properties',
                        key
                    ], keyPointerPath)) {
                    return error;
                }
            }
            if (schema.patternProperties !== undefined) {
                for (var patternKey in schema.patternProperties) {
                    var regexp = new RegExp(patternKey);
                    if (regexp.test(key)) {
                        foundMatch = true;
                        if (error = this.validateAll(data[key], schema.patternProperties[patternKey], [key], [
                                'patternProperties',
                                patternKey
                            ], keyPointerPath)) {
                            return error;
                        }
                    }
                }
            }
            if (!foundMatch) {
                if (schema.additionalProperties !== undefined) {
                    if (this.trackUnknownProperties) {
                        this.knownPropertyPaths[keyPointerPath] = true;
                        delete this.unknownPropertyPaths[keyPointerPath];
                    }
                    if (typeof schema.additionalProperties === 'boolean') {
                        if (!schema.additionalProperties) {
                            error = this.createError(ErrorCodes.OBJECT_ADDITIONAL_PROPERTIES, {}).prefixWith(key, 'additionalProperties');
                            if (this.handleError(error)) {
                                return error;
                            }
                        }
                    } else {
                        if (error = this.validateAll(data[key], schema.additionalProperties, [key], ['additionalProperties'], keyPointerPath)) {
                            return error;
                        }
                    }
                } else if (this.trackUnknownProperties && !this.knownPropertyPaths[keyPointerPath]) {
                    this.unknownPropertyPaths[keyPointerPath] = true;
                }
            } else if (this.trackUnknownProperties) {
                this.knownPropertyPaths[keyPointerPath] = true;
                delete this.unknownPropertyPaths[keyPointerPath];
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateObjectDependencies = function validateObjectDependencies(data, schema, dataPointerPath) {
        var error;
        if (schema.dependencies !== undefined) {
            for (var depKey in schema.dependencies) {
                if (data[depKey] !== undefined) {
                    var dep = schema.dependencies[depKey];
                    if (typeof dep === 'string') {
                        if (data[dep] === undefined) {
                            error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {
                                key: depKey,
                                missing: dep
                            }).prefixWith(null, depKey).prefixWith(null, 'dependencies');
                            if (this.handleError(error)) {
                                return error;
                            }
                        }
                    } else if (Array.isArray(dep)) {
                        for (var i = 0; i < dep.length; i++) {
                            var requiredKey = dep[i];
                            if (data[requiredKey] === undefined) {
                                error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {
                                    key: depKey,
                                    missing: requiredKey
                                }).prefixWith(null, '' + i).prefixWith(null, depKey).prefixWith(null, 'dependencies');
                                if (this.handleError(error)) {
                                    return error;
                                }
                            }
                        }
                    } else {
                        if (error = this.validateAll(data, dep, [], [
                                'dependencies',
                                depKey
                            ], dataPointerPath)) {
                            return error;
                        }
                    }
                }
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateCombinations = function validateCombinations(data, schema, dataPointerPath) {
        return this.validateAllOf(data, schema, dataPointerPath) || this.validateAnyOf(data, schema, dataPointerPath) || this.validateOneOf(data, schema, dataPointerPath) || this.validateNot(data, schema, dataPointerPath) || null;
    };
    ValidatorContext.prototype.validateAllOf = function validateAllOf(data, schema, dataPointerPath) {
        if (schema.allOf === undefined) {
            return null;
        }
        var error;
        for (var i = 0; i < schema.allOf.length; i++) {
            var subSchema = schema.allOf[i];
            if (error = this.validateAll(data, subSchema, [], [
                    'allOf',
                    i
                ], dataPointerPath)) {
                return error;
            }
        }
        return null;
    };
    ValidatorContext.prototype.validateAnyOf = function validateAnyOf(data, schema, dataPointerPath) {
        if (schema.anyOf === undefined) {
            return null;
        }
        var errors = [];
        var startErrorCount = this.errors.length;
        var oldUnknownPropertyPaths, oldKnownPropertyPaths;
        if (this.trackUnknownProperties) {
            oldUnknownPropertyPaths = this.unknownPropertyPaths;
            oldKnownPropertyPaths = this.knownPropertyPaths;
        }
        var errorAtEnd = true;
        for (var i = 0; i < schema.anyOf.length; i++) {
            if (this.trackUnknownProperties) {
                this.unknownPropertyPaths = {};
                this.knownPropertyPaths = {};
            }
            var subSchema = schema.anyOf[i];
            var errorCount = this.errors.length;
            var error = this.validateAll(data, subSchema, [], [
                'anyOf',
                i
            ], dataPointerPath);
            if (error === null && errorCount === this.errors.length) {
                this.errors = this.errors.slice(0, startErrorCount);
                if (this.trackUnknownProperties) {
                    for (var knownKey in this.knownPropertyPaths) {
                        oldKnownPropertyPaths[knownKey] = true;
                        delete oldUnknownPropertyPaths[knownKey];
                    }
                    for (var unknownKey in this.unknownPropertyPaths) {
                        if (!oldKnownPropertyPaths[unknownKey]) {
                            oldUnknownPropertyPaths[unknownKey] = true;
                        }
                    }
                    errorAtEnd = false;
                    continue;
                }
                return null;
            }
            if (error) {
                errors.push(error.prefixWith(null, '' + i).prefixWith(null, 'anyOf'));
            }
        }
        if (this.trackUnknownProperties) {
            this.unknownPropertyPaths = oldUnknownPropertyPaths;
            this.knownPropertyPaths = oldKnownPropertyPaths;
        }
        if (errorAtEnd) {
            errors = errors.concat(this.errors.slice(startErrorCount));
            this.errors = this.errors.slice(0, startErrorCount);
            return this.createError(ErrorCodes.ANY_OF_MISSING, {}, '', '/anyOf', errors);
        }
    };
    ValidatorContext.prototype.validateOneOf = function validateOneOf(data, schema, dataPointerPath) {
        if (schema.oneOf === undefined) {
            return null;
        }
        var validIndex = null;
        var errors = [];
        var startErrorCount = this.errors.length;
        var oldUnknownPropertyPaths, oldKnownPropertyPaths;
        if (this.trackUnknownProperties) {
            oldUnknownPropertyPaths = this.unknownPropertyPaths;
            oldKnownPropertyPaths = this.knownPropertyPaths;
        }
        for (var i = 0; i < schema.oneOf.length; i++) {
            if (this.trackUnknownProperties) {
                this.unknownPropertyPaths = {};
                this.knownPropertyPaths = {};
            }
            var subSchema = schema.oneOf[i];
            var errorCount = this.errors.length;
            var error = this.validateAll(data, subSchema, [], [
                'oneOf',
                i
            ], dataPointerPath);
            if (error === null && errorCount === this.errors.length) {
                if (validIndex === null) {
                    validIndex = i;
                } else {
                    this.errors = this.errors.slice(0, startErrorCount);
                    return this.createError(ErrorCodes.ONE_OF_MULTIPLE, {
                        index1: validIndex,
                        index2: i
                    }, '', '/oneOf');
                }
                if (this.trackUnknownProperties) {
                    for (var knownKey in this.knownPropertyPaths) {
                        oldKnownPropertyPaths[knownKey] = true;
                        delete oldUnknownPropertyPaths[knownKey];
                    }
                    for (var unknownKey in this.unknownPropertyPaths) {
                        if (!oldKnownPropertyPaths[unknownKey]) {
                            oldUnknownPropertyPaths[unknownKey] = true;
                        }
                    }
                }
            } else if (error) {
                errors.push(error.prefixWith(null, '' + i).prefixWith(null, 'oneOf'));
            }
        }
        if (this.trackUnknownProperties) {
            this.unknownPropertyPaths = oldUnknownPropertyPaths;
            this.knownPropertyPaths = oldKnownPropertyPaths;
        }
        if (validIndex === null) {
            errors = errors.concat(this.errors.slice(startErrorCount));
            this.errors = this.errors.slice(0, startErrorCount);
            return this.createError(ErrorCodes.ONE_OF_MISSING, {}, '', '/oneOf', errors);
        } else {
            this.errors = this.errors.slice(0, startErrorCount);
        }
        return null;
    };
    ValidatorContext.prototype.validateNot = function validateNot(data, schema, dataPointerPath) {
        if (schema.not === undefined) {
            return null;
        }
        var oldErrorCount = this.errors.length;
        var oldUnknownPropertyPaths, oldKnownPropertyPaths;
        if (this.trackUnknownProperties) {
            oldUnknownPropertyPaths = this.unknownPropertyPaths;
            oldKnownPropertyPaths = this.knownPropertyPaths;
            this.unknownPropertyPaths = {};
            this.knownPropertyPaths = {};
        }
        var error = this.validateAll(data, schema.not, null, null, dataPointerPath);
        var notErrors = this.errors.slice(oldErrorCount);
        this.errors = this.errors.slice(0, oldErrorCount);
        if (this.trackUnknownProperties) {
            this.unknownPropertyPaths = oldUnknownPropertyPaths;
            this.knownPropertyPaths = oldKnownPropertyPaths;
        }
        if (error === null && notErrors.length === 0) {
            return this.createError(ErrorCodes.NOT_PASSED, {}, '', '/not');
        }
        return null;
    };
    function parseURI(url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return m ? {
            href: m[0] || '',
            protocol: m[1] || '',
            authority: m[2] || '',
            host: m[3] || '',
            hostname: m[4] || '',
            port: m[5] || '',
            pathname: m[6] || '',
            search: m[7] || '',
            hash: m[8] || ''
        } : null;
    }
    function resolveUrl(base, href) {
        function removeDotSegments(input) {
            var output = [];
            input.replace(/^(\.\.?(\/|$))+/, '').replace(/\/(\.(\/|$))+/g, '/').replace(/\/\.\.$/, '/../').replace(/\/?[^\/]*/g, function (p) {
                if (p === '/..') {
                    output.pop();
                } else {
                    output.push(p);
                }
            });
            return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
        }
        href = parseURI(href || '');
        base = parseURI(base || '');
        return !href || !base ? null : (href.protocol || base.protocol) + (href.protocol || href.authority ? href.authority : base.authority) + removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : href.pathname ? (base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname : base.pathname) + (href.protocol || href.authority || href.pathname ? href.search : href.search || base.search) + href.hash;
    }
    function getDocumentUri(uri) {
        return uri.split('#')[0];
    }
    function normSchema(schema, baseUri) {
        if (schema && typeof schema === 'object') {
            if (baseUri === undefined) {
                baseUri = schema.id;
            } else if (typeof schema.id === 'string') {
                baseUri = resolveUrl(baseUri, schema.id);
                schema.id = baseUri;
            }
            if (Array.isArray(schema)) {
                for (var i = 0; i < schema.length; i++) {
                    normSchema(schema[i], baseUri);
                }
            } else {
                if (typeof schema['$ref'] === 'string') {
                    schema['$ref'] = resolveUrl(baseUri, schema['$ref']);
                }
                for (var key in schema) {
                    if (key !== 'enum') {
                        normSchema(schema[key], baseUri);
                    }
                }
            }
        }
    }
    var ErrorCodes = {
        INVALID_TYPE: 0,
        ENUM_MISMATCH: 1,
        ANY_OF_MISSING: 10,
        ONE_OF_MISSING: 11,
        ONE_OF_MULTIPLE: 12,
        NOT_PASSED: 13,
        NUMBER_MULTIPLE_OF: 100,
        NUMBER_MINIMUM: 101,
        NUMBER_MINIMUM_EXCLUSIVE: 102,
        NUMBER_MAXIMUM: 103,
        NUMBER_MAXIMUM_EXCLUSIVE: 104,
        STRING_LENGTH_SHORT: 200,
        STRING_LENGTH_LONG: 201,
        STRING_PATTERN: 202,
        OBJECT_PROPERTIES_MINIMUM: 300,
        OBJECT_PROPERTIES_MAXIMUM: 301,
        OBJECT_REQUIRED: 302,
        OBJECT_ADDITIONAL_PROPERTIES: 303,
        OBJECT_DEPENDENCY_KEY: 304,
        ARRAY_LENGTH_SHORT: 400,
        ARRAY_LENGTH_LONG: 401,
        ARRAY_UNIQUE: 402,
        ARRAY_ADDITIONAL_ITEMS: 403,
        FORMAT_CUSTOM: 500,
        KEYWORD_CUSTOM: 501,
        CIRCULAR_REFERENCE: 600,
        UNKNOWN_PROPERTY: 1000
    };
    var ErrorCodeLookup = {};
    for (var key in ErrorCodes) {
        ErrorCodeLookup[ErrorCodes[key]] = key;
    }
    var ErrorMessagesDefault = {
        INVALID_TYPE: 'invalid type: {type} (expected {expected})',
        ENUM_MISMATCH: 'No enum match for: {value}',
        ANY_OF_MISSING: 'Data does not match any schemas from "anyOf"',
        ONE_OF_MISSING: 'Data does not match any schemas from "oneOf"',
        ONE_OF_MULTIPLE: 'Data is valid against more than one schema from "oneOf": indices {index1} and {index2}',
        NOT_PASSED: 'Data matches schema from "not"',
        NUMBER_MULTIPLE_OF: 'Value {value} is not a multiple of {multipleOf}',
        NUMBER_MINIMUM: 'Value {value} is less than minimum {minimum}',
        NUMBER_MINIMUM_EXCLUSIVE: 'Value {value} is equal to exclusive minimum {minimum}',
        NUMBER_MAXIMUM: 'Value {value} is greater than maximum {maximum}',
        NUMBER_MAXIMUM_EXCLUSIVE: 'Value {value} is equal to exclusive maximum {maximum}',
        STRING_LENGTH_SHORT: 'String is too short ({length} chars), minimum {minimum}',
        STRING_LENGTH_LONG: 'String is too long ({length} chars), maximum {maximum}',
        STRING_PATTERN: 'String does not match pattern: {pattern}',
        OBJECT_PROPERTIES_MINIMUM: 'Too few properties defined ({propertyCount}), minimum {minimum}',
        OBJECT_PROPERTIES_MAXIMUM: 'Too many properties defined ({propertyCount}), maximum {maximum}',
        OBJECT_REQUIRED: 'Missing required property: {key}',
        OBJECT_ADDITIONAL_PROPERTIES: 'Additional properties not allowed',
        OBJECT_DEPENDENCY_KEY: 'Dependency failed - key must exist: {missing} (due to key: {key})',
        ARRAY_LENGTH_SHORT: 'Array is too short ({length}), minimum {minimum}',
        ARRAY_LENGTH_LONG: 'Array is too long ({length}), maximum {maximum}',
        ARRAY_UNIQUE: 'Array items are not unique (indices {match1} and {match2})',
        ARRAY_ADDITIONAL_ITEMS: 'Additional items not allowed',
        FORMAT_CUSTOM: 'Format validation failed ({message})',
        KEYWORD_CUSTOM: 'Keyword failed: {key} ({message})',
        CIRCULAR_REFERENCE: 'Circular $refs: {urls}',
        UNKNOWN_PROPERTY: 'Unknown property (not in schema)'
    };
    function ValidationError(code, message, dataPath, schemaPath, subErrors) {
        Error.call(this);
        if (code === undefined) {
            throw new Error('No code supplied for error: ' + message);
        }
        this.message = message;
        this.code = code;
        this.dataPath = dataPath || '';
        this.schemaPath = schemaPath || '';
        this.subErrors = subErrors || null;
        var err = new Error(this.message);
        this.stack = err.stack || err.stacktrace;
        if (!this.stack) {
            try {
                throw err;
            } catch (err) {
                this.stack = err.stack || err.stacktrace;
            }
        }
    }
    ValidationError.prototype = Object.create(Error.prototype);
    ValidationError.prototype.constructor = ValidationError;
    ValidationError.prototype.name = 'ValidationError';
    ValidationError.prototype.prefixWith = function (dataPrefix, schemaPrefix) {
        if (dataPrefix !== null) {
            dataPrefix = dataPrefix.replace(/~/g, '~0').replace(/\//g, '~1');
            this.dataPath = '/' + dataPrefix + this.dataPath;
        }
        if (schemaPrefix !== null) {
            schemaPrefix = schemaPrefix.replace(/~/g, '~0').replace(/\//g, '~1');
            this.schemaPath = '/' + schemaPrefix + this.schemaPath;
        }
        if (this.subErrors !== null) {
            for (var i = 0; i < this.subErrors.length; i++) {
                this.subErrors[i].prefixWith(dataPrefix, schemaPrefix);
            }
        }
        return this;
    };
    function isTrustedUrl(baseUrl, testUrl) {
        if (testUrl.substring(0, baseUrl.length) === baseUrl) {
            var remainder = testUrl.substring(baseUrl.length);
            if (testUrl.length > 0 && testUrl.charAt(baseUrl.length - 1) === '/' || remainder.charAt(0) === '#' || remainder.charAt(0) === '?') {
                return true;
            }
        }
        return false;
    }
    var languages = {};
    function createApi(language) {
        var globalContext = new ValidatorContext();
        var currentLanguage = language || 'en';
        var api = {
            addFormat: function () {
                globalContext.addFormat.apply(globalContext, arguments);
            },
            language: function (code) {
                if (!code) {
                    return currentLanguage;
                }
                if (!languages[code]) {
                    code = code.split('-')[0];
                }
                if (languages[code]) {
                    currentLanguage = code;
                    return code;
                }
                return false;
            },
            addLanguage: function (code, messageMap) {
                var key;
                for (key in ErrorCodes) {
                    if (messageMap[key] && !messageMap[ErrorCodes[key]]) {
                        messageMap[ErrorCodes[key]] = messageMap[key];
                    }
                }
                var rootCode = code.split('-')[0];
                if (!languages[rootCode]) {
                    languages[code] = messageMap;
                    languages[rootCode] = messageMap;
                } else {
                    languages[code] = Object.create(languages[rootCode]);
                    for (key in messageMap) {
                        if (typeof languages[rootCode][key] === 'undefined') {
                            languages[rootCode][key] = messageMap[key];
                        }
                        languages[code][key] = messageMap[key];
                    }
                }
                return this;
            },
            freshApi: function (language) {
                var result = createApi();
                if (language) {
                    result.language(language);
                }
                return result;
            },
            validate: function (data, schema, checkRecursive, banUnknownProperties) {
                var context = new ValidatorContext(globalContext, false, languages[currentLanguage], checkRecursive, banUnknownProperties);
                if (typeof schema === 'string') {
                    schema = { '$ref': schema };
                }
                context.addSchema('', schema);
                var error = context.validateAll(data, schema, null, null, '');
                if (!error && banUnknownProperties) {
                    error = context.banUnknownProperties();
                }
                this.error = error;
                this.missing = context.missing;
                this.valid = error === null;
                return this.valid;
            },
            validateResult: function () {
                var result = {};
                this.validate.apply(result, arguments);
                return result;
            },
            validateMultiple: function (data, schema, checkRecursive, banUnknownProperties) {
                var context = new ValidatorContext(globalContext, true, languages[currentLanguage], checkRecursive, banUnknownProperties);
                if (typeof schema === 'string') {
                    schema = { '$ref': schema };
                }
                context.addSchema('', schema);
                context.validateAll(data, schema, null, null, '');
                if (banUnknownProperties) {
                    context.banUnknownProperties();
                }
                var result = {};
                result.errors = context.errors;
                result.missing = context.missing;
                result.valid = result.errors.length === 0;
                return result;
            },
            addSchema: function () {
                return globalContext.addSchema.apply(globalContext, arguments);
            },
            getSchema: function () {
                return globalContext.getSchema.apply(globalContext, arguments);
            },
            getSchemaMap: function () {
                return globalContext.getSchemaMap.apply(globalContext, arguments);
            },
            getSchemaUris: function () {
                return globalContext.getSchemaUris.apply(globalContext, arguments);
            },
            getMissingUris: function () {
                return globalContext.getMissingUris.apply(globalContext, arguments);
            },
            dropSchemas: function () {
                globalContext.dropSchemas.apply(globalContext, arguments);
            },
            defineKeyword: function () {
                globalContext.defineKeyword.apply(globalContext, arguments);
            },
            defineError: function (codeName, codeNumber, defaultMessage) {
                if (typeof codeName !== 'string' || !/^[A-Z]+(_[A-Z]+)*$/.test(codeName)) {
                    throw new Error('Code name must be a string in UPPER_CASE_WITH_UNDERSCORES');
                }
                if (typeof codeNumber !== 'number' || codeNumber % 1 !== 0 || codeNumber < 10000) {
                    throw new Error('Code number must be an integer > 10000');
                }
                if (typeof ErrorCodes[codeName] !== 'undefined') {
                    throw new Error('Error already defined: ' + codeName + ' as ' + ErrorCodes[codeName]);
                }
                if (typeof ErrorCodeLookup[codeNumber] !== 'undefined') {
                    throw new Error('Error code already used: ' + ErrorCodeLookup[codeNumber] + ' as ' + codeNumber);
                }
                ErrorCodes[codeName] = codeNumber;
                ErrorCodeLookup[codeNumber] = codeName;
                ErrorMessagesDefault[codeName] = ErrorMessagesDefault[codeNumber] = defaultMessage;
                for (var langCode in languages) {
                    var language = languages[langCode];
                    if (language[codeName]) {
                        language[codeNumber] = language[codeNumber] || language[codeName];
                    }
                }
            },
            reset: function () {
                globalContext.reset();
                this.error = null;
                this.missing = [];
                this.valid = true;
            },
            missing: [],
            error: null,
            valid: true,
            normSchema: normSchema,
            resolveUrl: resolveUrl,
            getDocumentUri: getDocumentUri,
            errorCodes: ErrorCodes
        };
        return api;
    }
    var tv4 = createApi();
    tv4.addLanguage('en-gb', ErrorMessagesDefault);
    tv4.tv4 = tv4;
    return tv4;
}));
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('SeedModules.AngularUI/js/seed/schema-form', [
            'angular',
            'objectpath',
            'tv4'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('angular'), require('objectpath'), require('tv4'));
    } else {
        root.schemaForm = factory(root.angular, root.objectpath, root.tv4);
    }
}(this, function (angular, objectpath, tv4) {
    var deps = [];
    try {
        angular.module('ngSanitize');
        deps.push('ngSanitize');
    } catch (e) {
    }
    try {
        angular.module('ui.sortable');
        deps.push('ui.sortable');
    } catch (e) {
    }
    try {
        angular.module('angularSpectrumColorpicker');
        deps.push('angularSpectrumColorpicker');
    } catch (e) {
    }
    var schemaForm = angular.module('schemaForm', deps);
    angular.module('schemaForm').provider('sfPath', [function () {
            var ObjectPath = window.ObjectPath || objectpath;
            var sfPath = { parse: ObjectPath.parse };
            if (angular.version.major === 1 && angular.version.minor < 3) {
                sfPath.stringify = function (arr) {
                    return Array.isArray(arr) ? arr.join('.') : arr.toString();
                };
            } else {
                sfPath.stringify = ObjectPath.stringify;
            }
            sfPath.normalize = function (data, quote) {
                return sfPath.stringify(Array.isArray(data) ? data : sfPath.parse(data), quote);
            };
            this.parse = sfPath.parse;
            this.stringify = sfPath.stringify;
            this.normalize = sfPath.normalize;
            this.$get = function () {
                return sfPath;
            };
        }]);
    angular.module('schemaForm').provider('sfBuilder', [
        'sfPathProvider',
        function (sfPathProvider) {
            var SNAKE_CASE_REGEXP = /[A-Z]/g;
            var snakeCase = function (name, separator) {
                separator = separator || '_';
                return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
                    return (pos ? separator : '') + letter.toLowerCase();
                });
            };
            var formId = 0;
            var builders = {
                sfField: function (args) {
                    args.fieldFrag.firstChild.setAttribute('sf-field', formId);
                    args.lookup['f' + formId] = args.form;
                    formId++;
                },
                ngModel: function (args) {
                    if (!args.form.key) {
                        return;
                    }
                    var key = args.form.key;
                    if (args.state.keyRedaction) {
                        key = key.slice(args.state.keyRedaction);
                    }
                    var modelValue;
                    if (!args.state.modelValue) {
                        var strKey = sfPathProvider.stringify(key).replace(/"/g, '&quot;');
                        modelValue = args.state.modelName || 'model';
                        if (strKey) {
                            modelValue += (strKey[0] !== '[' ? '.' : '') + strKey;
                        }
                    } else {
                        modelValue = args.state.modelValue;
                    }
                    var nodes = args.fieldFrag.querySelectorAll('[sf-field-model]');
                    for (var i = 0; i < nodes.length; i++) {
                        var n = nodes[i];
                        var conf = n.getAttribute('sf-field-model');
                        if (!conf || conf === '') {
                            n.setAttribute('ng-model', modelValue);
                        } else if (conf === 'replaceAll') {
                            var attributes = n.attributes;
                            for (var j = 0; j < attributes.length; j++) {
                                if (attributes[j].value && attributes[j].value.indexOf('$$value') !== -1) {
                                    attributes[j].value = attributes[j].value.replace(/\$\$value\$\$/g, modelValue);
                                }
                            }
                        } else {
                            var val = n.getAttribute(conf);
                            if (val && val.indexOf('$$value$$')) {
                                n.setAttribute(conf, val.replace(/\$\$value\$\$/g, modelValue));
                            } else {
                                n.setAttribute(conf, modelValue);
                            }
                        }
                    }
                },
                simpleTransclusion: function (args) {
                    var children = args.build(args.form.items, args.path + '.items', args.state);
                    args.fieldFrag.firstChild.appendChild(children);
                },
                ngModelOptions: function (args) {
                    if (args.form.ngModelOptions && Object.keys(args.form.ngModelOptions).length > 0) {
                        args.fieldFrag.firstChild.setAttribute('ng-model-options', JSON.stringify(args.form.ngModelOptions));
                    }
                },
                transclusion: function (args) {
                    var transclusions = args.fieldFrag.querySelectorAll('[sf-field-transclude]');
                    if (transclusions.length) {
                        for (var i = 0; i < transclusions.length; i++) {
                            var n = transclusions[i];
                            var sub = n.getAttribute('sf-field-transclude') || 'items';
                            var items = args.form[sub];
                            if (items) {
                                var childFrag = args.build(items, args.path + '.' + sub, args.state);
                                n.appendChild(childFrag);
                            }
                        }
                    }
                },
                condition: function (args) {
                    if (args.form.condition) {
                        var evalExpr = 'evalExpr(' + args.path + '.condition, { model: model, "arrayIndex": $index})';
                        if (args.form.key) {
                            var strKey = sfPathProvider.stringify(args.form.key);
                            evalExpr = 'evalExpr(' + args.path + '.condition,{ model: model, "arrayIndex": $index, ' + '"modelValue": model' + (strKey[0] === '[' ? '' : '.') + strKey + '})';
                        }
                        var children = args.fieldFrag.children || args.fieldFrag.childNodes;
                        for (var i = 0; i < children.length; i++) {
                            var child = children[i];
                            var ngIf = child.getAttribute('ng-if');
                            child.setAttribute('ng-if', ngIf ? '(' + ngIf + ') || (' + evalExpr + ')' : evalExpr);
                        }
                    }
                },
                array: function (args) {
                    var items = args.fieldFrag.querySelector('[schema-form-array-items]');
                    if (items) {
                        state = angular.copy(args.state);
                        state.keyRedaction = state.keyRedaction || 0;
                        state.keyRedaction += args.form.key.length + 1;
                        if (args.form.schema && args.form.schema.items && args.form.schema.items.type && args.form.schema.items.type.indexOf('object') === -1 && args.form.schema.items.type.indexOf('array') === -1) {
                            var strKey = sfPathProvider.stringify(args.form.key).replace(/"/g, '&quot;') + '[$index]';
                            state.modelValue = 'modelArray[$index]';
                        } else {
                            state.modelName = 'item';
                        }
                        state.arrayCompatFlag = true;
                        var childFrag = args.build(args.form.items, args.path + '.items', state);
                        items.appendChild(childFrag);
                    }
                }
            };
            this.builders = builders;
            var stdBuilders = [
                builders.sfField,
                builders.ngModel,
                builders.ngModelOptions,
                builders.condition
            ];
            this.stdBuilders = stdBuilders;
            this.$get = [
                '$templateCache',
                'schemaFormDecorators',
                'sfPath',
                function ($templateCache, schemaFormDecorators, sfPath) {
                    var checkForSlot = function (form, slots) {
                        if (form.key) {
                            var slot = slots[sfPath.stringify(form.key)];
                            if (slot) {
                                while (slot.firstChild) {
                                    slot.removeChild(slot.firstChild);
                                }
                                return slot;
                            }
                        }
                    };
                    var build = function (items, decorator, templateFn, slots, path, state, lookup) {
                        state = state || {};
                        lookup = lookup || Object.create(null);
                        path = path || 'schemaForm.form';
                        var container = document.createDocumentFragment();
                        items.reduce(function (frag, f, index) {
                            if (!f.type) {
                                return frag;
                            }
                            var field = decorator[f.type] || decorator['default'];
                            if (!field.replace) {
                                var n = document.createElement(snakeCase(decorator.__name, '-'));
                                if (state.arrayCompatFlag) {
                                    n.setAttribute('form', 'copyWithIndex($index)');
                                } else {
                                    n.setAttribute('form', path + '[' + index + ']');
                                }
                                (checkForSlot(f, slots) || frag).appendChild(n);
                            } else {
                                var tmpl;
                                state.arrayCompatFlag = false;
                                var div = document.createElement('div');
                                var template = templateFn(f, field) || templateFn(f, decorator['default']);
                                div.innerHTML = template;
                                tmpl = document.createDocumentFragment();
                                while (div.childNodes.length > 0) {
                                    tmpl.appendChild(div.childNodes[0]);
                                }
                                var args = {
                                    fieldFrag: tmpl,
                                    form: f,
                                    lookup: lookup,
                                    state: state,
                                    path: path + '[' + index + ']',
                                    build: function (items, path, state) {
                                        return build(items, decorator, templateFn, slots, path, state, lookup);
                                    }
                                };
                                var builderFn = f.builder || field.builder;
                                if (typeof builderFn === 'function') {
                                    builderFn(args);
                                } else {
                                    builderFn.forEach(function (fn) {
                                        fn(args);
                                    });
                                }
                                (checkForSlot(f, slots) || frag).appendChild(tmpl);
                            }
                            return frag;
                        }, container);
                        return container;
                    };
                    return {
                        build: function (form, decorator, slots, lookup) {
                            return build(form, decorator, function (form, field) {
                                if (form.type === 'template') {
                                    return form.template;
                                }
                                return $templateCache.get(field.template);
                            }, slots, undefined, undefined, lookup);
                        },
                        builder: builders,
                        stdBuilders: stdBuilders,
                        internalBuild: build
                    };
                }
            ];
        }
    ]);
    angular.module('schemaForm').provider('schemaFormDecorators', [
        '$compileProvider',
        'sfPathProvider',
        function ($compileProvider, sfPathProvider) {
            var defaultDecorator = '';
            var decorators = {};
            var templateUrl = function (name, form) {
                if (name === 'sfDecorator') {
                    name = defaultDecorator;
                }
                var decorator = decorators[name];
                if (decorator[form.type]) {
                    return decorator[form.type].template;
                }
                return decorator['default'].template;
            };
            var createDirective = function (name) {
                $compileProvider.directive(name, [
                    '$parse',
                    '$compile',
                    '$http',
                    '$templateCache',
                    '$interpolate',
                    '$q',
                    'sfErrorMessage',
                    'sfPath',
                    'sfSelect',
                    function ($parse, $compile, $http, $templateCache, $interpolate, $q, sfErrorMessage, sfPath, sfSelect) {
                        return {
                            restrict: 'AE',
                            replace: false,
                            transclude: false,
                            scope: true,
                            require: '?^sfSchema',
                            link: function (scope, element, attrs, sfSchema) {
                                scope.$on('schemaFormPropagateNgModelController', function (event, ngModel) {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    scope.ngModel = ngModel;
                                });
                                scope.showTitle = function () {
                                    return scope.form && scope.form.notitle !== true && scope.form.title;
                                };
                                scope.listToCheckboxValues = function (list) {
                                    var values = {};
                                    angular.forEach(list, function (v) {
                                        values[v] = true;
                                    });
                                    return values;
                                };
                                scope.checkboxValuesToList = function (values) {
                                    var lst = [];
                                    angular.forEach(values, function (v, k) {
                                        if (v) {
                                            lst.push(k);
                                        }
                                    });
                                    return lst;
                                };
                                scope.buttonClick = function ($event, form) {
                                    if (angular.isFunction(form.onClick)) {
                                        form.onClick($event, form);
                                    } else if (angular.isString(form.onClick)) {
                                        if (sfSchema) {
                                            sfSchema.evalInParentScope(form.onClick, {
                                                '$event': $event,
                                                form: form
                                            });
                                        } else {
                                            scope.$eval(form.onClick, {
                                                '$event': $event,
                                                form: form
                                            });
                                        }
                                    }
                                };
                                scope.evalExpr = function (expression, locals) {
                                    if (sfSchema) {
                                        return sfSchema.evalInParentScope(expression, locals);
                                    }
                                    return scope.$eval(expression, locals);
                                };
                                scope.evalInScope = function (expression, locals) {
                                    if (expression) {
                                        return scope.$eval(expression, locals);
                                    }
                                };
                                scope.interp = function (expression, locals) {
                                    return expression && $interpolate(expression)(locals);
                                };
                                scope.hasSuccess = function () {
                                    if (!scope.ngModel) {
                                        return false;
                                    }
                                    return scope.ngModel.$valid && (!scope.ngModel.$pristine || !scope.ngModel.$isEmpty(scope.ngModel.$modelValue));
                                };
                                scope.hasError = function () {
                                    if (!scope.ngModel) {
                                        return false;
                                    }
                                    return scope.ngModel.$invalid && !scope.ngModel.$pristine;
                                };
                                scope.errorMessage = function (schemaError) {
                                    return sfErrorMessage.interpolate(schemaError && schemaError.code + '' || 'default', scope.ngModel && scope.ngModel.$modelValue || '', scope.ngModel && scope.ngModel.$viewValue || '', scope.form, scope.options && scope.options.validationMessage);
                                };
                                var once = scope.$watch(attrs.form, function (form) {
                                    if (form) {
                                        form.ngModelOptions = form.ngModelOptions || {};
                                        scope.form = form;
                                        var templatePromise;
                                        if (form.type === 'template' && form.template) {
                                            templatePromise = $q.when(form.template);
                                        } else {
                                            var url = form.type === 'template' ? form.templateUrl : templateUrl(name, form);
                                            templatePromise = $http.get(url, { cache: $templateCache }).then(function (res) {
                                                return res.data;
                                            });
                                        }
                                        templatePromise.then(function (template) {
                                            if (form.key) {
                                                var key = form.key ? sfPathProvider.stringify(form.key).replace(/"/g, '&quot;') : '';
                                                template = template.replace(/\$\$value\$\$/g, 'model' + (key[0] !== '[' ? '.' : '') + key);
                                            }
                                            element.html(template);
                                            if (form.condition) {
                                                var evalExpr = 'evalExpr(form.condition,{ model: model, "arrayIndex": arrayIndex})';
                                                if (form.key) {
                                                    evalExpr = 'evalExpr(form.condition,{ model: model, "arrayIndex": arrayIndex, "modelValue": model' + sfPath.stringify(form.key) + '})';
                                                }
                                                angular.forEach(element.children(), function (child) {
                                                    var ngIf = child.getAttribute('ng-if');
                                                    child.setAttribute('ng-if', ngIf ? '(' + ngIf + ') || (' + evalExpr + ')' : evalExpr);
                                                });
                                            }
                                            $compile(element.contents())(scope);
                                        });
                                        if (form.key) {
                                            scope.$on('schemaForm.error.' + form.key.join('.'), function (event, error, validationMessage, validity) {
                                                if (validationMessage === true || validationMessage === false) {
                                                    validity = validationMessage;
                                                    validationMessage = undefined;
                                                }
                                                if (scope.ngModel && error) {
                                                    if (scope.ngModel.$setDirty) {
                                                        scope.ngModel.$setDirty();
                                                    } else {
                                                        scope.ngModel.$dirty = true;
                                                        scope.ngModel.$pristine = false;
                                                    }
                                                    if (validationMessage) {
                                                        if (!form.validationMessage) {
                                                            form.validationMessage = {};
                                                        }
                                                        form.validationMessage[error] = validationMessage;
                                                    }
                                                    scope.ngModel.$setValidity(error, validity === true);
                                                    if (validity === true) {
                                                        scope.ngModel.$validate();
                                                        scope.$broadcast('schemaFormValidate');
                                                    }
                                                }
                                            });
                                            scope.$on('$destroy', function () {
                                                if (!scope.externalDestructionInProgress) {
                                                    var destroyStrategy = form.destroyStrategy || scope.options && scope.options.destroyStrategy || 'remove';
                                                    if (form.key && destroyStrategy !== 'retain') {
                                                        var obj = scope.model;
                                                        if (form.key.length > 1) {
                                                            obj = sfSelect(form.key.slice(0, form.key.length - 1), obj);
                                                        }
                                                        if (obj === undefined) {
                                                            return;
                                                        }
                                                        var type = form.schema && form.schema.type || '';
                                                        if (destroyStrategy === 'empty' && type.indexOf('string') !== -1) {
                                                            obj[form.key.slice(-1)] = '';
                                                        } else if (destroyStrategy === 'empty' && type.indexOf('object') !== -1) {
                                                            obj[form.key.slice(-1)] = {};
                                                        } else if (destroyStrategy === 'empty' && type.indexOf('array') !== -1) {
                                                            obj[form.key.slice(-1)] = [];
                                                        } else if (destroyStrategy === 'null') {
                                                            obj[form.key.slice(-1)] = null;
                                                        } else {
                                                            delete obj[form.key.slice(-1)];
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                        once();
                                    }
                                });
                            }
                        };
                    }
                ]);
            };
            var createManualDirective = function (type, templateUrl, transclude) {
                transclude = angular.isDefined(transclude) ? transclude : false;
                $compileProvider.directive('sf' + angular.uppercase(type[0]) + type.substr(1), function () {
                    return {
                        restrict: 'EAC',
                        scope: true,
                        replace: true,
                        transclude: transclude,
                        template: '<sf-decorator form="form"></sf-decorator>',
                        link: function (scope, element, attrs) {
                            var watchThis = {
                                'items': 'c',
                                'titleMap': 'c',
                                'schema': 'c'
                            };
                            var form = { type: type };
                            var once = true;
                            angular.forEach(attrs, function (value, name) {
                                if (name[0] !== '$' && name.indexOf('ng') !== 0 && name !== 'sfField') {
                                    var updateForm = function (val) {
                                        if (angular.isDefined(val) && val !== form[name]) {
                                            form[name] = val;
                                            if (once && form.type && (form.key || angular.isUndefined(attrs.key))) {
                                                scope.form = form;
                                                once = false;
                                            }
                                        }
                                    };
                                    if (name === 'model') {
                                        scope.$watch(value, function (val) {
                                            if (val && scope.model !== val) {
                                                scope.model = val;
                                            }
                                        });
                                    } else if (watchThis[name] === 'c') {
                                        scope.$watchCollection(value, updateForm);
                                    } else {
                                        attrs.$observe(name, updateForm);
                                    }
                                }
                            });
                        }
                    };
                });
            };
            this.createDecorator = function (name, templates) {
                decorators[name] = { '__name': name };
                angular.forEach(templates, function (url, type) {
                    decorators[name][type] = {
                        template: url,
                        replace: false,
                        builder: []
                    };
                });
                if (!decorators[defaultDecorator]) {
                    defaultDecorator = name;
                }
                createDirective(name);
            };
            this.defineDecorator = function (name, fields) {
                decorators[name] = { '__name': name };
                angular.forEach(fields, function (field, type) {
                    field.builder = field.builder || [];
                    field.replace = angular.isDefined(field.replace) ? field.replace : true;
                    decorators[name][type] = field;
                });
                if (!decorators[defaultDecorator]) {
                    defaultDecorator = name;
                }
                createDirective(name);
            };
            this.createDirective = createManualDirective;
            this.createDirectives = function (templates) {
                angular.forEach(templates, function (url, type) {
                    createManualDirective(type, url);
                });
            };
            this.decorator = function (name) {
                name = name || defaultDecorator;
                return decorators[name];
            };
            this.addMapping = function (name, type, url, builder, replace) {
                if (decorators[name]) {
                    decorators[name][type] = {
                        template: url,
                        builder: builder,
                        replace: !!replace
                    };
                }
            };
            this.defineAddOn = function (name, type, url, builder) {
                if (decorators[name]) {
                    decorators[name][type] = {
                        template: url,
                        builder: builder,
                        replace: true
                    };
                }
            };
            this.$get = function () {
                return {
                    decorator: function (name) {
                        return decorators[name] || decorators[defaultDecorator];
                    },
                    defaultDecorator: defaultDecorator
                };
            };
            createDirective('sfDecorator');
        }
    ]);
    angular.module('schemaForm').provider('sfErrorMessage', function () {
        var defaultMessages = {
            'default': 'Field does not validate',
            0: 'Invalid type, expected {{schema.type}}',
            1: 'No enum match for: {{viewValue}}',
            10: 'Data does not match any schemas from "anyOf"',
            11: 'Data does not match any schemas from "oneOf"',
            12: 'Data is valid against more than one schema from "oneOf"',
            13: 'Data matches schema from "not"',
            100: 'Value is not a multiple of {{schema.multipleOf}}',
            101: '{{viewValue}} is less than the allowed minimum of {{schema.minimum}}',
            102: '{{viewValue}} is equal to the exclusive minimum {{schema.minimum}}',
            103: '{{viewValue}} is greater than the allowed maximum of {{schema.maximum}}',
            104: '{{viewValue}} is equal to the exclusive maximum {{schema.maximum}}',
            105: 'Value is not a valid number',
            200: 'String is too short ({{viewValue.length}} chars), minimum {{schema.minLength}}',
            201: 'String is too long ({{viewValue.length}} chars), maximum {{schema.maxLength}}',
            202: 'String does not match pattern: {{schema.pattern}}',
            300: 'Too few properties defined, minimum {{schema.minProperties}}',
            301: 'Too many properties defined, maximum {{schema.maxProperties}}',
            302: 'Required',
            303: 'Additional properties not allowed',
            304: 'Dependency failed - key must exist',
            400: 'Array is too short ({{value.length}}), minimum {{schema.minItems}}',
            401: 'Array is too long ({{value.length}}), maximum {{schema.maxItems}}',
            402: 'Array items are not unique',
            403: 'Additional items not allowed',
            500: 'Format validation failed',
            501: 'Keyword failed: "{{title}}"',
            600: 'Circular $refs',
            1000: 'Unknown property (not in schema)'
        };
        defaultMessages.number = defaultMessages[105];
        defaultMessages.required = defaultMessages[302];
        defaultMessages.min = defaultMessages[101];
        defaultMessages.max = defaultMessages[103];
        defaultMessages.maxlength = defaultMessages[201];
        defaultMessages.minlength = defaultMessages[200];
        defaultMessages.pattern = defaultMessages[202];
        this.setDefaultMessages = function (messages) {
            defaultMessages = messages;
        };
        this.getDefaultMessages = function () {
            return defaultMessages;
        };
        this.setDefaultMessage = function (error, msg) {
            defaultMessages[error] = msg;
        };
        this.$get = [
            '$interpolate',
            function ($interpolate) {
                var service = {};
                service.defaultMessages = defaultMessages;
                service.interpolate = function (error, value, viewValue, form, global) {
                    global = global || {};
                    var validationMessage = form.validationMessage || {};
                    if (error.indexOf('tv4-') === 0) {
                        error = error.substring(4);
                    }
                    var message = validationMessage['default'] || global['default'] || '';
                    [
                        validationMessage,
                        global,
                        defaultMessages
                    ].some(function (val) {
                        if (angular.isString(val) || angular.isFunction(val)) {
                            message = val;
                            return true;
                        }
                        if (val && val[error]) {
                            message = val[error];
                            return true;
                        }
                    });
                    var context = {
                        error: error,
                        value: value,
                        viewValue: viewValue,
                        form: form,
                        schema: form.schema,
                        title: form.title || form.schema && form.schema.title
                    };
                    if (angular.isFunction(message)) {
                        return message(context);
                    } else {
                        return $interpolate(message)(context);
                    }
                };
                return service;
            }
        ];
    });
    angular.module('schemaForm').provider('schemaForm', [
        'sfPathProvider',
        function (sfPathProvider) {
            var stripNullType = function (type) {
                if (Array.isArray(type) && type.length == 2) {
                    if (type[0] === 'null')
                        return type[1];
                    if (type[1] === 'null')
                        return type[0];
                }
                return type;
            };
            var enumToTitleMap = function (enm) {
                var titleMap = [];
                enm.forEach(function (name) {
                    titleMap.push({
                        name: name,
                        value: name
                    });
                });
                return titleMap;
            };
            var canonicalTitleMap = function (titleMap, originalEnum) {
                if (!angular.isArray(titleMap)) {
                    var canonical = [];
                    if (originalEnum) {
                        angular.forEach(originalEnum, function (value, index) {
                            canonical.push({
                                name: titleMap[value],
                                value: value
                            });
                        });
                    } else {
                        angular.forEach(titleMap, function (name, value) {
                            canonical.push({
                                name: name,
                                value: value
                            });
                        });
                    }
                    return canonical;
                }
                return titleMap;
            };
            var defaultFormDefinition = function (name, schema, options) {
                var rules = defaults[stripNullType(schema.type)];
                if (rules) {
                    var def;
                    for (var i = 0; i < rules.length; i++) {
                        def = rules[i](name, schema, options);
                        if (def) {
                            if (def.schema['x-schema-form'] && angular.isObject(def.schema['x-schema-form'])) {
                                def = angular.extend(def, def.schema['x-schema-form']);
                            }
                            return def;
                        }
                    }
                }
            };
            var stdFormObj = function (name, schema, options) {
                options = options || {};
                var f = options.global && options.global.formDefaults ? angular.copy(options.global.formDefaults) : {};
                if (options.global && options.global.supressPropertyTitles === true) {
                    f.title = schema.title;
                } else {
                    f.title = schema.title || name;
                }
                if (schema.description) {
                    f.description = schema.description;
                }
                if (options.required === true || schema.required === true) {
                    f.required = true;
                }
                if (schema.maxLength) {
                    f.maxlength = schema.maxLength;
                }
                if (schema.minLength) {
                    f.minlength = schema.minLength;
                }
                if (schema.readOnly || schema.readonly) {
                    f.readonly = true;
                }
                if (schema.minimum) {
                    f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0);
                }
                if (schema.maximum) {
                    f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0);
                }
                if (schema.validationMessage) {
                    f.validationMessage = schema.validationMessage;
                }
                if (schema.enumNames) {
                    f.titleMap = canonicalTitleMap(schema.enumNames, schema['enum']);
                }
                f.schema = schema;
                f.ngModelOptions = f.ngModelOptions || {};
                return f;
            };
            var text = function (name, schema, options) {
                if (stripNullType(schema.type) === 'string' && !schema['enum']) {
                    var f = stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'text';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };
            var number = function (name, schema, options) {
                if (stripNullType(schema.type) === 'number') {
                    var f = stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'number';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };
            var integer = function (name, schema, options) {
                if (stripNullType(schema.type) === 'integer') {
                    var f = stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'number';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };
            var checkbox = function (name, schema, options) {
                if (stripNullType(schema.type) === 'boolean') {
                    var f = stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'checkbox';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };
            var select = function (name, schema, options) {
                if (stripNullType(schema.type) === 'string' && schema['enum']) {
                    var f = stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'select';
                    if (!f.titleMap) {
                        f.titleMap = enumToTitleMap(schema['enum']);
                    }
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };
            var checkboxes = function (name, schema, options) {
                if (stripNullType(schema.type) === 'array' && schema.items && schema.items['enum']) {
                    var f = stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'checkboxes';
                    if (!f.titleMap) {
                        f.titleMap = enumToTitleMap(schema.items['enum']);
                    }
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };
            var fieldset = function (name, schema, options) {
                if (stripNullType(schema.type) === 'object') {
                    var f = stdFormObj(name, schema, options);
                    f.type = 'fieldset';
                    f.items = [];
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    angular.forEach(schema.properties, function (v, k) {
                        var path = options.path.slice();
                        path.push(k);
                        if (options.ignore[sfPathProvider.stringify(path)] !== true) {
                            var required = schema.required && schema.required.indexOf(k) !== -1;
                            var def = defaultFormDefinition(k, v, {
                                path: path,
                                required: required || false,
                                lookup: options.lookup,
                                ignore: options.ignore,
                                global: options.global
                            });
                            if (def) {
                                f.items.push(def);
                            }
                        }
                    });
                    return f;
                }
            };
            var array = function (name, schema, options) {
                if (stripNullType(schema.type) === 'array') {
                    var f = stdFormObj(name, schema, options);
                    f.type = 'array';
                    f.key = options.path;
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    var required = schema.required && schema.required.indexOf(options.path[options.path.length - 1]) !== -1;
                    var arrPath = options.path.slice();
                    arrPath.push('');
                    f.items = [defaultFormDefinition(name, schema.items, {
                            path: arrPath,
                            required: required || false,
                            lookup: options.lookup,
                            ignore: options.ignore,
                            global: options.global
                        })];
                    return f;
                }
            };
            var defaults = {
                string: [
                    select,
                    text
                ],
                object: [fieldset],
                number: [number],
                integer: [integer],
                boolean: [checkbox],
                array: [
                    checkboxes,
                    array
                ]
            };
            var postProcessFn = function (form) {
                return form;
            };
            this.defaults = defaults;
            this.stdFormObj = stdFormObj;
            this.defaultFormDefinition = defaultFormDefinition;
            this.postProcess = function (fn) {
                postProcessFn = fn;
            };
            this.appendRule = function (type, rule) {
                if (!defaults[type]) {
                    defaults[type] = [];
                }
                defaults[type].push(rule);
            };
            this.prependRule = function (type, rule) {
                if (!defaults[type]) {
                    defaults[type] = [];
                }
                defaults[type].unshift(rule);
            };
            this.createStandardForm = stdFormObj;
            this.$get = function () {
                var service = {};
                service.merge = function (schema, form, ignore, options, readonly, asyncTemplates) {
                    form = form || ['*'];
                    options = options || {};
                    readonly = readonly || schema.readonly || schema.readOnly;
                    var stdForm = service.defaults(schema, ignore, options);
                    var idx = form.indexOf('*');
                    if (idx !== -1) {
                        form = form.slice(0, idx).concat(stdForm.form).concat(form.slice(idx + 1));
                    }
                    var lookup = stdForm.lookup;
                    return postProcessFn(form.map(function (obj) {
                        if (typeof obj === 'string') {
                            obj = { key: obj };
                        }
                        if (obj.key) {
                            if (typeof obj.key === 'string') {
                                obj.key = sfPathProvider.parse(obj.key);
                            }
                        }
                        if (obj.titleMap) {
                            obj.titleMap = canonicalTitleMap(obj.titleMap);
                        }
                        if (obj.itemForm) {
                            obj.items = [];
                            var str = sfPathProvider.stringify(obj.key);
                            var stdForm = lookup[str];
                            angular.forEach(stdForm.items, function (item) {
                                var o = angular.copy(obj.itemForm);
                                o.key = item.key;
                                obj.items.push(o);
                            });
                        }
                        if (obj.key) {
                            var strid = sfPathProvider.stringify(obj.key);
                            if (lookup[strid]) {
                                var schemaDefaults = lookup[strid];
                                angular.forEach(schemaDefaults, function (value, attr) {
                                    if (obj[attr] === undefined) {
                                        obj[attr] = schemaDefaults[attr];
                                    }
                                });
                            }
                        }
                        if (readonly === true) {
                            obj.readonly = true;
                        }
                        if (obj.items) {
                            obj.items = service.merge(schema, obj.items, ignore, options, obj.readonly, asyncTemplates);
                        }
                        if (obj.tabs) {
                            angular.forEach(obj.tabs, function (tab) {
                                tab.items = service.merge(schema, tab.items, ignore, options, obj.readonly, asyncTemplates);
                            });
                        }
                        if (obj.type === 'checkbox' && angular.isUndefined(obj.schema['default'])) {
                            obj.schema['default'] = false;
                        }
                        if (asyncTemplates && obj.type === 'template' && !obj.template && obj.templateUrl) {
                            asyncTemplates.push(obj);
                        }
                        return obj;
                    }));
                };
                service.defaults = function (schema, ignore, globalOptions) {
                    var form = [];
                    var lookup = {};
                    ignore = ignore || {};
                    globalOptions = globalOptions || {};
                    if (stripNullType(schema.type) === 'object') {
                        angular.forEach(schema.properties, function (v, k) {
                            if (ignore[k] !== true) {
                                var required = schema.required && schema.required.indexOf(k) !== -1;
                                var def = defaultFormDefinition(k, v, {
                                    path: [k],
                                    lookup: lookup,
                                    ignore: ignore,
                                    required: required,
                                    global: globalOptions
                                });
                                if (def) {
                                    form.push(def);
                                }
                            }
                        });
                    } else {
                        throw new Error('Not implemented. Only type "object" allowed at root level of schema.');
                    }
                    return {
                        form: form,
                        lookup: lookup
                    };
                };
                service.traverseSchema = function (schema, fn, path, ignoreArrays) {
                    ignoreArrays = angular.isDefined(ignoreArrays) ? ignoreArrays : true;
                    path = path || [];
                    var traverse = function (schema, fn, path) {
                        fn(schema, path);
                        angular.forEach(schema.properties, function (prop, name) {
                            var currentPath = path.slice();
                            currentPath.push(name);
                            traverse(prop, fn, currentPath);
                        });
                        if (!ignoreArrays && schema.items) {
                            var arrPath = path.slice();
                            arrPath.push('');
                            traverse(schema.items, fn, arrPath);
                        }
                    };
                    traverse(schema, fn, path || []);
                };
                service.traverseForm = function (form, fn) {
                    fn(form);
                    angular.forEach(form.items, function (f) {
                        service.traverseForm(f, fn);
                    });
                    if (form.tabs) {
                        angular.forEach(form.tabs, function (tab) {
                            angular.forEach(tab.items, function (f) {
                                service.traverseForm(f, fn);
                            });
                        });
                    }
                };
                return service;
            };
        }
    ]);
    angular.module('schemaForm').factory('sfSelect', [
        'sfPath',
        function (sfPath) {
            var numRe = /^\d+$/;
            return function (projection, obj, valueToSet) {
                if (!obj) {
                    obj = this;
                }
                var parts = typeof projection === 'string' ? sfPath.parse(projection) : projection;
                if (typeof valueToSet !== 'undefined' && parts.length === 1) {
                    obj[parts[0]] = valueToSet;
                    return obj;
                }
                if (typeof valueToSet !== 'undefined' && typeof obj[parts[0]] === 'undefined') {
                    obj[parts[0]] = parts.length > 2 && numRe.test(parts[1]) ? [] : {};
                }
                var value = obj[parts[0]];
                for (var i = 1; i < parts.length; i++) {
                    if (parts[i] === '') {
                        return undefined;
                    }
                    if (typeof valueToSet !== 'undefined') {
                        if (i === parts.length - 1) {
                            value[parts[i]] = valueToSet;
                            return valueToSet;
                        } else {
                            var tmp = value[parts[i]];
                            if (typeof tmp === 'undefined' || tmp === null) {
                                tmp = numRe.test(parts[i + 1]) ? [] : {};
                                value[parts[i]] = tmp;
                            }
                            value = tmp;
                        }
                    } else if (value) {
                        value = value[parts[i]];
                    }
                }
                return value;
            };
        }
    ]);
    angular.module('schemaForm').factory('sfValidator', [function () {
            var validator = {};
            validator.validate = function (form, value) {
                if (!form) {
                    return { valid: true };
                }
                var schema = form.schema;
                if (!schema) {
                    return { valid: true };
                }
                if (value === '') {
                    value = undefined;
                }
                if (form.type === 'number' && value === null) {
                    value = undefined;
                }
                var wrap = {
                    type: 'object',
                    'properties': {}
                };
                var propName = form.key[form.key.length - 1];
                wrap.properties[propName] = schema;
                if (form.required) {
                    wrap.required = [propName];
                }
                var valueWrap = {};
                if (angular.isDefined(value)) {
                    valueWrap[propName] = value;
                }
                return tv4.validateResult(valueWrap, wrap);
            };
            return validator;
        }]);
    angular.module('schemaForm').directive('sfArray', [
        'sfSelect',
        'schemaForm',
        'sfValidator',
        'sfPath',
        function (sfSelect, schemaForm, sfValidator, sfPath) {
            var setIndex = function (index) {
                return function (form) {
                    if (form.key) {
                        form.key[form.key.indexOf('')] = index;
                    }
                };
            };
            return {
                restrict: 'A',
                scope: true,
                require: '?ngModel',
                link: function (scope, element, attrs, ngModel) {
                    var formDefCache = {};
                    scope.validateArray = angular.noop;
                    if (ngModel) {
                        scope.$emit('schemaFormPropagateNgModelController', ngModel);
                    }
                    var once = scope.$watch(attrs.sfArray, function (form) {
                        if (!form) {
                            return;
                        }
                        var list = sfSelect(form.key, scope.model);
                        var key = sfPath.normalize(form.key);
                        scope.$watch('model' + (key[0] !== '[' ? '.' : '') + key, function (value) {
                            list = scope.modelArray = value;
                        });
                        if (angular.isUndefined(list)) {
                            list = [];
                            sfSelect(form.key, scope.model, list);
                        }
                        scope.modelArray = list;
                        if (form.items) {
                            var subForm = form.items[0];
                            if (form.items.length > 1) {
                                subForm = {
                                    type: 'section',
                                    items: form.items.map(function (item) {
                                        item.ngModelOptions = form.ngModelOptions;
                                        if (angular.isUndefined(item.readonly)) {
                                            item.readonly = form.readonly;
                                        }
                                        return item;
                                    })
                                };
                            }
                        }
                        scope.copyWithIndex = function (index) {
                            if (!formDefCache[index]) {
                                if (subForm) {
                                    var copy = angular.copy(subForm);
                                    copy.arrayIndex = index;
                                    schemaForm.traverseForm(copy, setIndex(index));
                                    formDefCache[index] = copy;
                                }
                            }
                            return formDefCache[index];
                        };
                        scope.appendToArray = function () {
                            var len = list.length;
                            var copy = scope.copyWithIndex(len);
                            schemaForm.traverseForm(copy, function (part) {
                                if (part.key) {
                                    var def;
                                    if (angular.isDefined(part['default'])) {
                                        def = part['default'];
                                    }
                                    if (angular.isDefined(part.schema) && angular.isDefined(part.schema['default'])) {
                                        def = part.schema['default'];
                                    }
                                    if (angular.isDefined(def)) {
                                        sfSelect(part.key, scope.model, def);
                                    }
                                }
                            });
                            if (len === list.length) {
                                var type = sfSelect('schema.items.type', form);
                                var dflt;
                                if (type === 'object') {
                                    dflt = {};
                                } else if (type === 'array') {
                                    dflt = [];
                                }
                                list.push(dflt);
                            }
                            scope.validateArray();
                            return list;
                        };
                        scope.deleteFromArray = function (index) {
                            list.splice(index, 1);
                            scope.validateArray();
                            if (ngModel && ngModel.$setDirty) {
                                ngModel.$setDirty();
                            }
                            return list;
                        };
                        if (!form.titleMap && form.startEmpty !== true && list.length === 0) {
                            scope.appendToArray();
                        }
                        if (form.titleMap && form.titleMap.length > 0) {
                            scope.titleMapValues = [];
                            var updateTitleMapValues = function (arr) {
                                scope.titleMapValues = [];
                                arr = arr || [];
                                form.titleMap.forEach(function (item) {
                                    scope.titleMapValues.push(arr.indexOf(item.value) !== -1);
                                });
                            };
                            updateTitleMapValues(scope.modelArray);
                            scope.$watchCollection('modelArray', updateTitleMapValues);
                            scope.$watchCollection('titleMapValues', function (vals, old) {
                                if (vals && vals !== old) {
                                    var arr = scope.modelArray;
                                    while (arr.length > 0) {
                                        arr.pop();
                                    }
                                    form.titleMap.forEach(function (item, index) {
                                        if (vals[index]) {
                                            arr.push(item.value);
                                        }
                                    });
                                    scope.validateArray();
                                }
                            });
                        }
                        if (ngModel) {
                            var error;
                            scope.validateArray = function () {
                                var result = sfValidator.validate(form, scope.modelArray.length > 0 ? scope.modelArray : undefined);
                                Object.keys(ngModel.$error).filter(function (k) {
                                    return k.indexOf('tv4-') === 0;
                                }).forEach(function (k) {
                                    ngModel.$setValidity(k, true);
                                });
                                if (result.valid === false && result.error && (result.error.dataPath === '' || result.error.dataPath === '/' + form.key[form.key.length - 1])) {
                                    ngModel.$setViewValue(scope.modelArray);
                                    error = result.error;
                                    ngModel.$setValidity('tv4-' + result.error.code, false);
                                }
                            };
                            scope.$on('schemaFormValidate', scope.validateArray);
                            scope.hasSuccess = function () {
                                if (scope.options && scope.options.pristine && scope.options.pristine.success === false) {
                                    return ngModel.$valid && !ngModel.$pristine && !ngModel.$isEmpty(ngModel.$modelValue);
                                } else {
                                    return ngModel.$valid && (!ngModel.$pristine || !ngModel.$isEmpty(ngModel.$modelValue));
                                }
                            };
                            scope.hasError = function () {
                                if (!scope.options || !scope.options.pristine || scope.options.pristine.errors !== false) {
                                    return ngModel.$invalid;
                                } else {
                                    return ngModel.$invalid && !ngModel.$pristine;
                                }
                            };
                            scope.schemaError = function () {
                                return error;
                            };
                        }
                        once();
                    });
                }
            };
        }
    ]);
    angular.module('schemaForm').directive('sfChanged', function () {
        return {
            require: 'ngModel',
            restrict: 'AC',
            scope: false,
            link: function (scope, element, attrs, ctrl) {
                var form = scope.$eval(attrs.sfChanged);
                if (form && form.onChange) {
                    ctrl.$viewChangeListeners.push(function () {
                        if (angular.isFunction(form.onChange)) {
                            form.onChange(ctrl.$modelValue, form);
                        } else {
                            scope.evalExpr(form.onChange, {
                                'modelValue': ctrl.$modelValue,
                                form: form
                            });
                        }
                    });
                }
            }
        };
    });
    angular.module('schemaForm').directive('sfField', [
        '$parse',
        '$compile',
        '$http',
        '$templateCache',
        '$interpolate',
        '$q',
        'sfErrorMessage',
        'sfPath',
        'sfSelect',
        function ($parse, $compile, $http, $templateCache, $interpolate, $q, sfErrorMessage, sfPath, sfSelect) {
            return {
                restrict: 'AE',
                replace: false,
                transclude: false,
                scope: true,
                require: '^sfSchema',
                link: {
                    pre: function (scope, element, attrs, sfSchema) {
                        scope.$on('schemaFormPropagateNgModelController', function (event, ngModel) {
                            event.stopPropagation();
                            event.preventDefault();
                            scope.ngModel = ngModel;
                        });
                        scope.form = sfSchema.lookup['f' + attrs.sfField];
                    },
                    post: function (scope, element, attrs, sfSchema) {
                        scope.showTitle = function () {
                            return scope.form && scope.form.notitle !== true && scope.form.title;
                        };
                        scope.listToCheckboxValues = function (list) {
                            var values = {};
                            angular.forEach(list, function (v) {
                                values[v] = true;
                            });
                            return values;
                        };
                        scope.checkboxValuesToList = function (values) {
                            var lst = [];
                            angular.forEach(values, function (v, k) {
                                if (v) {
                                    lst.push(k);
                                }
                            });
                            return lst;
                        };
                        scope.buttonClick = function ($event, form) {
                            if (angular.isFunction(form.onClick)) {
                                form.onClick($event, form);
                            } else if (angular.isString(form.onClick)) {
                                if (sfSchema) {
                                    sfSchema.evalInParentScope(form.onClick, {
                                        '$event': $event,
                                        form: form
                                    });
                                } else {
                                    scope.$eval(form.onClick, {
                                        '$event': $event,
                                        form: form
                                    });
                                }
                            }
                        };
                        scope.evalExpr = function (expression, locals) {
                            if (sfSchema) {
                                return sfSchema.evalInParentScope(expression, locals);
                            }
                            return scope.$eval(expression, locals);
                        };
                        scope.evalInScope = function (expression, locals) {
                            if (expression) {
                                return scope.$eval(expression, locals);
                            }
                        };
                        scope.interp = function (expression, locals) {
                            return expression && $interpolate(expression)(locals);
                        };
                        scope.hasSuccess = function () {
                            if (!scope.ngModel) {
                                return false;
                            }
                            if (scope.options && scope.options.pristine && scope.options.pristine.success === false) {
                                return scope.ngModel.$valid && !scope.ngModel.$pristine && !scope.ngModel.$isEmpty(scope.ngModel.$modelValue);
                            } else {
                                return scope.ngModel.$valid && (!scope.ngModel.$pristine || !scope.ngModel.$isEmpty(scope.ngModel.$modelValue));
                            }
                        };
                        scope.hasError = function () {
                            if (!scope.ngModel) {
                                return false;
                            }
                            if (!scope.options || !scope.options.pristine || scope.options.pristine.errors !== false) {
                                return scope.ngModel.$invalid;
                            } else {
                                return scope.ngModel.$invalid && !scope.ngModel.$pristine;
                            }
                        };
                        scope.errorMessage = function (schemaError) {
                            return sfErrorMessage.interpolate(schemaError && schemaError.code + '' || 'default', scope.ngModel && scope.ngModel.$modelValue || '', scope.ngModel && scope.ngModel.$viewValue || '', scope.form, scope.options && scope.options.validationMessage);
                        };
                        var form = scope.form;
                        if (form.key) {
                            scope.$on('schemaForm.error.' + form.key.join('.'), function (event, error, validationMessage, validity) {
                                if (validationMessage === true || validationMessage === false) {
                                    validity = validationMessage;
                                    validationMessage = undefined;
                                }
                                if (scope.ngModel && error) {
                                    if (scope.ngModel.$setDirty) {
                                        scope.ngModel.$setDirty();
                                    } else {
                                        scope.ngModel.$dirty = true;
                                        scope.ngModel.$pristine = false;
                                    }
                                    if (validationMessage) {
                                        if (!form.validationMessage) {
                                            form.validationMessage = {};
                                        }
                                        form.validationMessage[error] = validationMessage;
                                    }
                                    scope.ngModel.$setValidity(error, validity === true);
                                    if (validity === true) {
                                        scope.ngModel.$validate();
                                        scope.$broadcast('schemaFormValidate');
                                    }
                                }
                            });
                            scope.$on('$destroy', function () {
                                if (!scope.externalDestructionInProgress) {
                                    var destroyStrategy = form.destroyStrategy || scope.options && scope.options.destroyStrategy || 'remove';
                                    if (form.key && destroyStrategy !== 'retain') {
                                        var obj = scope.model;
                                        if (form.key.length > 1) {
                                            obj = sfSelect(form.key.slice(0, form.key.length - 1), obj);
                                        }
                                        if (obj === undefined) {
                                            return;
                                        }
                                        var type = form.schema && form.schema.type || '';
                                        if (destroyStrategy === 'empty' && type.indexOf('string') !== -1) {
                                            obj[form.key.slice(-1)] = '';
                                        } else if (destroyStrategy === 'empty' && type.indexOf('object') !== -1) {
                                            obj[form.key.slice(-1)] = {};
                                        } else if (destroyStrategy === 'empty' && type.indexOf('array') !== -1) {
                                            obj[form.key.slice(-1)] = [];
                                        } else if (destroyStrategy === 'null') {
                                            obj[form.key.slice(-1)] = null;
                                        } else {
                                            delete obj[form.key.slice(-1)];
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            };
        }
    ]);
    angular.module('schemaForm').directive('sfMessage', [
        '$injector',
        'sfErrorMessage',
        function ($injector, sfErrorMessage) {
            var $sanitize = $injector.has('$sanitize') ? $injector.get('$sanitize') : function (html) {
                return html;
            };
            return {
                scope: false,
                restrict: 'EA',
                link: function (scope, element, attrs) {
                    var message = '';
                    if (attrs.sfMessage) {
                        scope.$watch(attrs.sfMessage, function (msg) {
                            if (msg) {
                                message = $sanitize(msg);
                                update(!!scope.ngModel);
                            }
                        });
                    }
                    var currentMessage;
                    var setMessage = function (msg) {
                        if (msg !== currentMessage) {
                            element.html(msg);
                            currentMessage = msg;
                        }
                    };
                    var update = function (checkForErrors) {
                        if (checkForErrors) {
                            if (!scope.hasError()) {
                                setMessage(message);
                            } else {
                                var errors = [];
                                angular.forEach(scope.ngModel && scope.ngModel.$error, function (status, code) {
                                    if (status) {
                                        errors.push(code);
                                    }
                                });
                                errors = errors.filter(function (e) {
                                    return e !== 'schemaForm';
                                });
                                var error = errors[0];
                                if (error) {
                                    setMessage(sfErrorMessage.interpolate(error, scope.ngModel.$modelValue, scope.ngModel.$viewValue, scope.form, scope.options && scope.options.validationMessage));
                                } else {
                                    setMessage(message);
                                }
                            }
                        } else {
                            setMessage(message);
                        }
                    };
                    update();
                    var once = scope.$watch('ngModel', function (ngModel) {
                        if (ngModel) {
                            ngModel.$parsers.push(function (val) {
                                update(true);
                                return val;
                            });
                            ngModel.$formatters.push(function (val) {
                                update(true);
                                return val;
                            });
                            once();
                        }
                    });
                    scope.$watchCollection('ngModel.$error', function () {
                        update(!!scope.ngModel);
                    });
                }
            };
        }
    ]);
    angular.module('schemaForm').directive('sfNewArray', [
        'sfSelect',
        'sfPath',
        'schemaForm',
        function (sel, sfPath, schemaForm) {
            return {
                scope: false,
                link: function (scope, element, attrs) {
                    scope.min = 0;
                    scope.modelArray = scope.$eval(attrs.sfNewArray);
                    var watchFn = function () {
                        scope.modelArray = scope.$eval(attrs.sfNewArray);
                        if (scope.ngModel && scope.ngModel.$pristine && scope.firstDigest && (!scope.options || scope.options.validateOnRender !== true)) {
                            return;
                        } else if (scope.validateField) {
                            scope.validateField();
                        }
                    };
                    var onChangeFn = function () {
                        if (scope.form && scope.form.onChange) {
                            if (angular.isFunction(scope.form.onChange)) {
                                scope.form.onChange(scope.modelArray, scope.form);
                            } else {
                                scope.evalExpr(scope.form.onChange, {
                                    'modelValue': scope.modelArray,
                                    form: scope.form
                                });
                            }
                        }
                    };
                    var getOrCreateModel = function () {
                        var model = scope.modelArray;
                        if (!model) {
                            var selection = sfPath.parse(attrs.sfNewArray);
                            model = [];
                            sel(selection, scope, model);
                            scope.modelArray = model;
                        }
                        return model;
                    };
                    var once = scope.$watch('form', function (form) {
                        if (!form) {
                            return;
                        }
                        if (!form.titleMap && form.startEmpty !== true && (!scope.modelArray || scope.modelArray.length === 0)) {
                            scope.appendToArray();
                        }
                        if (scope.form && scope.form.schema && scope.form.schema.uniqueItems === true) {
                            scope.$watch(attrs.sfNewArray, watchFn, true);
                            scope.$watch([
                                attrs.sfNewArray,
                                attrs.sfNewArray + '.length'
                            ], onChangeFn);
                        } else {
                            if (scope.$watchGroup) {
                                scope.$watchGroup([
                                    attrs.sfNewArray,
                                    attrs.sfNewArray + '.length'
                                ], function () {
                                    watchFn();
                                    onChangeFn();
                                });
                            } else {
                                scope.$watch(attrs.sfNewArray, function () {
                                    watchFn();
                                    onChangeFn();
                                });
                                scope.$watch(attrs.sfNewArray + '.length', function () {
                                    watchFn();
                                    onChangeFn();
                                });
                            }
                        }
                        if (form.titleMap && form.titleMap.length > 0) {
                            scope.titleMapValues = [];
                            var updateTitleMapValues = function (arr) {
                                scope.titleMapValues = [];
                                arr = arr || [];
                                form.titleMap.forEach(function (item) {
                                    scope.titleMapValues.push(arr.indexOf(item.value) !== -1);
                                });
                            };
                            updateTitleMapValues(scope.modelArray);
                            scope.$watchCollection('modelArray', updateTitleMapValues);
                            scope.$watchCollection('titleMapValues', function (vals, old) {
                                if (vals && vals !== old) {
                                    var arr = getOrCreateModel();
                                    while (arr.length > 0) {
                                        arr.pop();
                                    }
                                    form.titleMap.forEach(function (item, index) {
                                        if (vals[index]) {
                                            arr.push(item.value);
                                        }
                                    });
                                    if (scope.validateField) {
                                        scope.validateField();
                                    }
                                }
                            });
                        }
                        once();
                    });
                    scope.appendToArray = function () {
                        var empty;
                        var model = getOrCreateModel();
                        if (scope.form && scope.form.schema && scope.form.schema.items) {
                            var items = scope.form.schema.items;
                            if (items.type && items.type.indexOf('object') !== -1) {
                                empty = {};
                                if (!scope.options || scope.options.setSchemaDefaults !== false) {
                                    empty = angular.isDefined(items['default']) ? items['default'] : empty;
                                    if (empty) {
                                        schemaForm.traverseSchema(items, function (prop, path) {
                                            if (angular.isDefined(prop['default'])) {
                                                sel(path, empty, prop['default']);
                                            }
                                        });
                                    }
                                }
                            } else if (items.type && items.type.indexOf('array') !== -1) {
                                empty = [];
                                if (!scope.options || scope.options.setSchemaDefaults !== false) {
                                    empty = items['default'] || empty;
                                }
                            } else {
                                if (!scope.options || scope.options.setSchemaDefaults !== false) {
                                    empty = items['default'] || empty;
                                }
                            }
                        }
                        model.push(empty);
                        return model;
                    };
                    scope.deleteFromArray = function (index) {
                        var model = scope.modelArray;
                        if (model) {
                            model.splice(index, 1);
                        }
                        return model;
                    };
                    var setIndex = function (index) {
                        return function (form) {
                            if (form.key) {
                                form.key[form.key.indexOf('')] = index;
                            }
                        };
                    };
                    var formDefCache = {};
                    scope.copyWithIndex = function (index) {
                        var form = scope.form;
                        if (!formDefCache[index]) {
                            var subForm = form.items[0];
                            if (form.items.length > 1) {
                                subForm = {
                                    type: 'section',
                                    items: form.items.map(function (item) {
                                        item.ngModelOptions = form.ngModelOptions;
                                        if (angular.isUndefined(item.readonly)) {
                                            item.readonly = form.readonly;
                                        }
                                        return item;
                                    })
                                };
                            }
                            if (subForm) {
                                var copy = angular.copy(subForm);
                                copy.arrayIndex = index;
                                schemaForm.traverseForm(copy, setIndex(index));
                                formDefCache[index] = copy;
                            }
                        }
                        return formDefCache[index];
                    };
                }
            };
        }
    ]);
    angular.module('schemaForm').directive('sfSchema', [
        '$compile',
        '$http',
        '$templateCache',
        '$q',
        'schemaForm',
        'schemaFormDecorators',
        'sfSelect',
        'sfPath',
        'sfBuilder',
        function ($compile, $http, $templateCache, $q, schemaForm, schemaFormDecorators, sfSelect, sfPath, sfBuilder) {
            return {
                scope: {
                    schema: '=sfSchema',
                    initialForm: '=sfForm',
                    model: '=sfModel',
                    options: '=sfOptions'
                },
                controller: [
                    '$scope',
                    function ($scope) {
                        this.evalInParentScope = function (expr, locals) {
                            return $scope.$parent.$eval(expr, locals);
                        };
                        var that = this;
                        $scope.lookup = function (lookup) {
                            if (lookup) {
                                that.lookup = lookup;
                            }
                            return that.lookup;
                        };
                    }
                ],
                replace: false,
                restrict: 'A',
                transclude: true,
                require: '?form',
                link: function (scope, element, attrs, formCtrl, transclude) {
                    scope.formCtrl = formCtrl;
                    var ignore = {};
                    transclude(scope, function (clone) {
                        clone.addClass('schema-form-ignore');
                        element.prepend(clone);
                        if (element[0].querySelectorAll) {
                            var models = element[0].querySelectorAll('[ng-model]');
                            if (models) {
                                for (var i = 0; i < models.length; i++) {
                                    var key = models[i].getAttribute('ng-model');
                                    ignore[key.substring(key.indexOf('.') + 1)] = true;
                                }
                            }
                        }
                    });
                    var lastDigest = {};
                    var childScope;
                    var render = function (schema, form) {
                        var asyncTemplates = [];
                        var merged = schemaForm.merge(schema, form, ignore, scope.options, undefined, asyncTemplates);
                        if (asyncTemplates.length > 0) {
                            $q.all(asyncTemplates.map(function (form) {
                                return $http.get(form.templateUrl, { cache: $templateCache }).then(function (res) {
                                    form.template = res.data;
                                });
                            })).then(function () {
                                internalRender(schema, form, merged);
                            });
                        } else {
                            internalRender(schema, form, merged);
                        }
                    };
                    var internalRender = function (schema, form, merged) {
                        if (childScope) {
                            scope.externalDestructionInProgress = true;
                            childScope.$destroy();
                            scope.externalDestructionInProgress = false;
                        }
                        childScope = scope.$new();
                        childScope.schemaForm = {
                            form: merged,
                            schema: schema
                        };
                        element.children(':not(.schema-form-ignore)').remove();
                        var slots = {};
                        var slotsFound = element[0].querySelectorAll('*[sf-insert-field]');
                        for (var i = 0; i < slotsFound.length; i++) {
                            slots[slotsFound[i].getAttribute('sf-insert-field')] = slotsFound[i];
                        }
                        var decorator = schemaFormDecorators.decorator(attrs.sfUseDecorator);
                        var lookup = Object.create(null);
                        scope.lookup(lookup);
                        element[0].appendChild(sfBuilder.build(merged, decorator, slots, lookup));
                        childScope.firstDigest = true;
                        setTimeout(function () {
                            childScope.firstDigest = false;
                        }, 0);
                        $compile(element.children())(childScope);
                        if (!scope.options || scope.options.setSchemaDefaults !== false) {
                            schemaForm.traverseSchema(schema, function (prop, path) {
                                if (angular.isDefined(prop['default'])) {
                                    var val = sfSelect(path, scope.model);
                                    if (angular.isUndefined(val)) {
                                        sfSelect(path, scope.model, prop['default']);
                                    }
                                }
                            });
                        }
                        scope.$emit('sf-render-finished', element);
                    };
                    var defaultForm = ['*'];
                    scope.$watch(function () {
                        var schema = scope.schema;
                        var form = scope.initialForm || defaultForm;
                        if (form && schema && schema.type && (lastDigest.form !== form || lastDigest.schema !== schema) && Object.keys(schema.properties).length > 0) {
                            lastDigest.schema = schema;
                            lastDigest.form = form;
                            render(schema, form);
                        }
                    });
                    scope.$on('schemaFormRedraw', function () {
                        var schema = scope.schema;
                        var form = scope.initialForm ? angular.copy(scope.initialForm) : ['*'];
                        if (schema) {
                            render(schema, form);
                        }
                    });
                    scope.$on('$destroy', function () {
                        scope.externalDestructionInProgress = true;
                    });
                    scope.evalExpr = function (expression, locals) {
                        return scope.$parent.$eval(expression, locals);
                    };
                }
            };
        }
    ]);
    angular.module('schemaForm').directive('schemaValidate', [
        'sfValidator',
        '$parse',
        'sfSelect',
        function (sfValidator, $parse, sfSelect) {
            return {
                restrict: 'A',
                scope: false,
                priority: 500,
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    scope.$emit('schemaFormPropagateNgModelController', ngModel);
                    var error = null;
                    var form = scope.$eval(attrs.schemaValidate);
                    if (form.copyValueTo) {
                        ngModel.$viewChangeListeners.push(function () {
                            var paths = form.copyValueTo;
                            angular.forEach(paths, function (path) {
                                sfSelect(path, scope.model, ngModel.$modelValue);
                            });
                        });
                    }
                    ;
                    var validate = function (viewValue) {
                        if (!form) {
                            return viewValue;
                        }
                        if (scope.options && scope.options.tv4Validation === false) {
                            return viewValue;
                        }
                        var result = sfValidator.validate(form, viewValue);
                        Object.keys(ngModel.$error).filter(function (k) {
                            return k.indexOf('tv4-') === 0;
                        }).forEach(function (k) {
                            ngModel.$setValidity(k, true);
                        });
                        if (!result.valid) {
                            ngModel.$setValidity('tv4-' + result.error.code, false);
                            error = result.error;
                            if (ngModel.$validators) {
                                return viewValue;
                            }
                            return undefined;
                        }
                        return viewValue;
                    };
                    if (typeof form.ngModel === 'function') {
                        form.ngModel(ngModel);
                    }
                    [
                        '$parsers',
                        '$viewChangeListeners',
                        '$formatters'
                    ].forEach(function (attr) {
                        if (form[attr] && ngModel[attr]) {
                            form[attr].forEach(function (fn) {
                                ngModel[attr].push(fn);
                            });
                        }
                    });
                    [
                        '$validators',
                        '$asyncValidators'
                    ].forEach(function (attr) {
                        if (form[attr] && ngModel[attr]) {
                            angular.forEach(form[attr], function (fn, name) {
                                ngModel[attr][name] = fn;
                            });
                        }
                    });
                    ngModel.$parsers.push(validate);
                    if (ngModel.$validators) {
                        ngModel.$validators.schemaForm = function () {
                            return !Object.keys(ngModel.$error).some(function (e) {
                                return e !== 'schemaForm';
                            });
                        };
                    }
                    var schema = form.schema;
                    scope.validateField = function (formName) {
                        if (formName != undefined && ngModel.$$parentForm.$name !== formName) {
                            return;
                        }
                        if (schema && schema.type.indexOf('array') !== -1) {
                            validate(ngModel.$modelValue);
                        }
                        if (ngModel.$setDirty) {
                            ngModel.$setDirty();
                            ngModel.$setViewValue(ngModel.$viewValue);
                            ngModel.$commitViewValue();
                            if (form.required && ngModel.$isEmpty(ngModel.$modelValue)) {
                                ngModel.$setValidity('tv4-302', false);
                            }
                        } else {
                            ngModel.$setViewValue(ngModel.$viewValue);
                        }
                    };
                    ngModel.$formatters.push(function (val) {
                        if (ngModel.$pristine && scope.firstDigest && (!scope.options || scope.options.validateOnRender !== true)) {
                            return val;
                        }
                        validate(ngModel.$modelValue);
                        return val;
                    });
                    scope.$on('schemaFormValidate', function (event, formName) {
                        scope.validateField(formName);
                    });
                    scope.schemaError = function () {
                        return error;
                    };
                }
            };
        }
    ]);
    return schemaForm;
}));
define('SeedModules.AngularUI/js/seed/bootstrap-decorator', ['SeedModules.AngularUI/js/seed/schema-form'], function () {
    angular.module('schemaForm').run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('decorators/bootstrap/actions-trcl.html', '<div class="btn-group schema-form-actions {{form.htmlClass}}" ng-transclude=""></div>');
            $templateCache.put('decorators/bootstrap/actions.html', '<div class="btn-group schema-form-actions {{form.htmlClass}}"><input ng-repeat-start="item in form.items" type="submit" class="btn {{ item.style || \'btn-default\' }} {{form.fieldHtmlClass}}" value="{{item.title}}" ng-if="item.type === \'submit\'"> <button ng-repeat-end="" class="btn {{ item.style || \'btn-default\' }} {{form.fieldHtmlClass}}" type="button" ng-disabled="form.readonly" ng-if="item.type !== \'submit\'" ng-click="buttonClick($event,item)"><span ng-if="item.icon" class="{{item.icon}}"></span>{{item.title}}</button></div>');
            $templateCache.put('decorators/bootstrap/array.html', '<div class="schema-form-array {{form.htmlClass}}" sf-field-model="sf-new-array" sf-new-array=""><label class="control-label" ng-show="showTitle()">{{ form.title }}</label><ol class="list-group" sf-field-model="" ui-sortable="form.sortOptions"><li class="list-group-item {{form.fieldHtmlClass}}" schema-form-array-items="" sf-field-model="ng-repeat" ng-repeat="item in $$value$$ track by $index"><button ng-hide="form.readonly || form.remove === null" ng-click="deleteFromArray($index)" ng-disabled="form.schema.minItems >= modelArray.length" style="position: relative; z-index: 20;" type="button" class="close pull-right"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></li></ol><div class="clearfix" style="padding: 15px;" ng-model="modelArray" schema-validate="form"><div class="help-block" ng-show="(hasError() && errorMessage(schemaError())) || form.description" ng-bind-html="(hasError() && errorMessage(schemaError())) || form.description"></div><button ng-hide="form.readonly || form.add === null" ng-click="appendToArray()" ng-disabled="form.schema.maxItems <= modelArray.length" type="button" class="btn {{ form.style.add || \'btn-default\' }} pull-right"><i class="glyphicon glyphicon-plus"></i> {{ form.add || \'Add\'}}</button></div></div>');
            $templateCache.put('decorators/bootstrap/checkbox.html', '<div class="checkbox schema-form-checkbox {{form.htmlClass}}" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}"><label class="{{form.labelHtmlClass}}"><input type="checkbox" sf-changed="form" ng-disabled="form.readonly" sf-field-model="" schema-validate="form" class="{{form.fieldHtmlClass}}" name="{{form.key.slice(-1)[0]}}"> <span ng-bind-html="form.title"></span></label><div class="help-block" sf-message="form.description"></div></div>');
            $templateCache.put('decorators/bootstrap/checkboxes.html', '<div sf-field-model="sf-new-array" sf-new-array="" class="form-group schema-form-checkboxes {{form.htmlClass}}" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}"><label class="control-label {{form.labelHtmlClass}}" sf-field-model="" schema-validate="form" ng-show="showTitle()">{{form.title}}</label><div class="checkbox" ng-repeat="val in titleMapValues track by $index"><label><input type="checkbox" ng-disabled="form.readonly" sf-changed="form" class="{{form.fieldHtmlClass}}" ng-model="titleMapValues[$index]" name="{{form.key.slice(-1)[0]}}"> <span ng-bind-html="form.titleMap[$index].name"></span></label></div><div class="help-block" sf-message="form.description"></div></div>');
            $templateCache.put('decorators/bootstrap/default.html', '<div class="form-group schema-form-{{form.type}} {{form.htmlClass}}" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }"><label class="control-label {{form.labelHtmlClass}}" ng-class="{\'sr-only\': !showTitle()}" for="{{form.key.slice(-1)[0]}}">{{form.title}}</label> <input ng-if="!form.fieldAddonLeft && !form.fieldAddonRight" ng-show="form.key" type="{{form.type}}" step="any" sf-changed="form" placeholder="{{form.placeholder}}" class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}" sf-field-model="" ng-disabled="form.readonly" schema-validate="form" name="{{form.key.slice(-1)[0]}}" aria-describedby="{{form.key.slice(-1)[0] + \'Status\'}}"><div ng-if="form.fieldAddonLeft || form.fieldAddonRight" ng-class="{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}"><span ng-if="form.fieldAddonLeft" class="input-group-addon" ng-bind-html="form.fieldAddonLeft"></span> <input ng-show="form.key" type="{{form.type}}" step="any" sf-changed="form" placeholder="{{form.placeholder}}" class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}" sf-field-model="" ng-disabled="form.readonly" schema-validate="form" name="{{form.key.slice(-1)[0]}}" aria-describedby="{{form.key.slice(-1)[0] + \'Status\'}}"> <span ng-if="form.fieldAddonRight" class="input-group-addon" ng-bind-html="form.fieldAddonRight"></span></div><span ng-if="form.feedback !== false" class="form-control-feedback" ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }" aria-hidden="true"></span> <span ng-if="hasError() || hasSuccess()" id="{{form.key.slice(-1)[0] + \'Status\'}}" class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span><div class="help-block" sf-message="form.description"></div></div>');
            $templateCache.put('decorators/bootstrap/fieldset.html', '<fieldset ng-disabled="form.readonly" class="schema-form-fieldset {{form.htmlClass}}"><legend ng-class="{\'sr-only\': !showTitle() }">{{ form.title }}</legend><div class="help-block" ng-show="form.description" ng-bind-html="form.description"></div></fieldset>');
            $templateCache.put('decorators/bootstrap/help.html', '<div class="helpvalue schema-form-helpvalue {{form.htmlClass}}" ng-bind-html="form.helpvalue"></div>');
            $templateCache.put('decorators/bootstrap/radio-buttons.html', '<div class="form-group schema-form-radiobuttons {{form.htmlClass}}" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}"><div><label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()">{{form.title}}</label></div><div class="btn-group"><label sf-field-model="replaceAll" class="btn {{ (item.value === $$value$$) ? form.style.selected || \'btn-default\' : form.style.unselected || \'btn-default\'; }}" ng-class="{ active: item.value === $$value$$ }" ng-repeat="item in form.titleMap"><input type="radio" class="{{form.fieldHtmlClass}}" sf-changed="form" style="display: none;" ng-disabled="form.readonly" sf-field-model="" schema-validate="form" ng-value="item.value" name="{{form.key.join(\'.\')}}"> <span ng-bind-html="item.name"></span></label></div><div class="help-block" sf-message="form.description"></div></div>');
            $templateCache.put('decorators/bootstrap/radios-inline.html', '<div class="form-group schema-form-radios-inline {{form.htmlClass}}" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}"><label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()" sf-field-model="" schema-validate="form">{{form.title}}</label><div><label class="radio-inline" ng-repeat="item in form.titleMap"><input type="radio" class="{{form.fieldHtmlClass}}" sf-changed="form" ng-disabled="form.readonly" sf-field-model="" ng-value="item.value" name="{{form.key.join(\'.\')}}"> <span ng-bind-html="item.name"></span></label></div><div class="help-block" sf-message="form.description"></div></div>');
            $templateCache.put('decorators/bootstrap/radios.html', '<div class="form-group schema-form-radios {{form.htmlClass}}" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}"><label class="control-label {{form.labelHtmlClass}}" sf-field-model="" schema-validate="form" ng-show="showTitle()">{{form.title}}</label><div class="radio" ng-repeat="item in form.titleMap"><label><input type="radio" class="{{form.fieldHtmlClass}}" sf-changed="form" ng-disabled="form.readonly" sf-field-model="" ng-value="item.value" name="{{form.key.join(\'.\')}}"> <span ng-bind-html="item.name"></span></label></div><div class="help-block" sf-message="form.description"></div></div>');
            $templateCache.put('decorators/bootstrap/section.html', '<div class="schema-form-section {{form.htmlClass}}"></div>');
            $templateCache.put('decorators/bootstrap/select.html', '<div class="form-group {{form.htmlClass}} schema-form-select" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false}"><label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()">{{form.title}}</label><select sf-field-model="" ng-disabled="form.readonly" sf-changed="form" class="form-control {{form.fieldHtmlClass}}" schema-validate="form" ng-options="item.value as item.name group by item.group for item in form.titleMap" name="{{form.key.slice(-1)[0]}}"></select><div class="help-block" sf-message="form.description"></div></div>');
            $templateCache.put('decorators/bootstrap/submit.html', '<div class="form-group schema-form-submit {{form.htmlClass}}"><input type="submit" class="btn {{ form.style || \'btn-primary\' }} {{form.fieldHtmlClass}}" value="{{form.title}}" ng-disabled="form.readonly" ng-if="form.type === \'submit\'"> <button class="btn {{ form.style || \'btn-default\' }}" type="button" ng-click="buttonClick($event,form)" ng-disabled="form.readonly" ng-if="form.type !== \'submit\'"><span ng-if="form.icon" class="{{form.icon}}"></span> {{form.title}}</button></div>');
            $templateCache.put('decorators/bootstrap/tabarray.html', '<div ng-init="selected = { tab: 0 }" ng-model="modelArray" schema-validate="form" sf-field-model="sf-new-array" sf-new-array="" class="clearfix schema-form-tabarray schema-form-tabarray-{{form.tabType || \'left\'}} {{form.htmlClass}}"><div ng-if="!form.tabType || form.tabType !== \'right\'" ng-class="{\'col-xs-3\': !form.tabType || form.tabType === \'left\'}"><ul class="nav nav-tabs" ng-class="{ \'tabs-left\': !form.tabType || form.tabType === \'left\'}"><li sf-field-model="ng-repeat" ng-repeat="item in $$value$$ track by $index" ng-click="$event.preventDefault() || (selected.tab = $index)" ng-class="{active: selected.tab === $index}"><a href="#">{{interp(form.title,{\'$index\':$index, value: item}) || $index}}</a></li><li ng-hide="form.readonly" ng-disabled="form.schema.maxItems <= modelArray.length" ng-click="$event.preventDefault() || (selected.tab = appendToArray().length - 1)"><a href="#"><i class="glyphicon glyphicon-plus"></i> {{ form.add || \'Add\'}}</a></li></ul></div><div ng-class="{\'col-xs-9\': !form.tabType || form.tabType === \'left\' || form.tabType === \'right\'}"><div class="tab-content {{form.fieldHtmlClass}}"><div class="tab-pane clearfix tab{{selected.tab}} index{{$index}}" sf-field-model="ng-repeat" ng-repeat="item in $$value$$ track by $index" ng-show="selected.tab === $index" ng-class="{active: selected.tab === $index}"><div schema-form-array-items=""></div><button ng-hide="form.readonly" ng-click="selected.tab = deleteFromArray($index).length - 1" ng-disabled="form.schema.minItems >= modelArray.length" type="button" class="btn {{ form.style.remove || \'btn-default\' }} pull-right"><i class="glyphicon glyphicon-trash"></i> {{ form.remove || \'Remove\'}}</button></div><div class="help-block" ng-show="(hasError() && errorMessage(schemaError())) || form.description" ng-bind-html="(hasError() && errorMessage(schemaError())) || form.description"></div></div></div></div><div ng-if="form.tabType === \'right\'" class="col-xs-3"><ul class="nav nav-tabs tabs-right"><li sf-field-model="ng-repeat" ng-repeat="item in $$value$$ track by $index" ng-click="$event.preventDefault() || (selected.tab = $index)" ng-class="{active: selected.tab === $index}"><a href="#">{{interp(form.title,{\'$index\':$index, value: item}) || $index}}</a></li><li ng-hide="form.readonly" ng-disabled="form.schema.maxItems <= modelArray.length" ng-click="$event.preventDefault() || (selected.tab = appendToArray().length - 1)"><a href="#"><i class="glyphicon glyphicon-plus"></i> {{ form.add || \'Add\'}}</a></li></ul></div>');
            $templateCache.put('decorators/bootstrap/tabs.html', '<div ng-init="selected = { tab: 0 }" class="schema-form-tabs {{form.htmlClass}}"><ul class="nav nav-tabs"><li ng-repeat="tab in form.tabs" ng-disabled="form.readonly" ng-click="$event.preventDefault() || (selected.tab = $index)" ng-class="{active: selected.tab === $index}"><a href="#">{{ tab.title }}</a></li></ul><div class="tab-content {{form.fieldHtmlClass}}"></div></div>');
            $templateCache.put('decorators/bootstrap/textarea.html', '<div class="form-group has-feedback {{form.htmlClass}} schema-form-textarea" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}"><label class="control-label {{form.labelHtmlClass}}" ng-class="{\'sr-only\': !showTitle()}" for="{{form.key.slice(-1)[0]}}">{{form.title}}</label> <textarea ng-if="!form.fieldAddonLeft && !form.fieldAddonRight" class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}" sf-changed="form" placeholder="{{form.placeholder}}" ng-disabled="form.readonly" sf-field-model="" schema-validate="form" name="{{form.key.slice(-1)[0]}}"></textarea><div ng-if="form.fieldAddonLeft || form.fieldAddonRight" ng-class="{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}"><span ng-if="form.fieldAddonLeft" class="input-group-addon" ng-bind-html="form.fieldAddonLeft"></span> <textarea class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}" sf-changed="form" placeholder="{{form.placeholder}}" ng-disabled="form.readonly" sf-field-model="" schema-validate="form" name="{{form.key.slice(-1)[0]}}"></textarea> <span ng-if="form.fieldAddonRight" class="input-group-addon" ng-bind-html="form.fieldAddonRight"></span></div><span class="help-block" sf-message="form.description"></span></div>');
        }
    ]);
    angular.module('schemaForm').config([
        'schemaFormDecoratorsProvider',
        'sfBuilderProvider',
        'sfPathProvider',
        function (decoratorsProvider, sfBuilderProvider, sfPathProvider) {
            var base = 'decorators/bootstrap/';
            var simpleTransclusion = sfBuilderProvider.builders.simpleTransclusion;
            var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
            var ngModel = sfBuilderProvider.builders.ngModel;
            var sfField = sfBuilderProvider.builders.sfField;
            var condition = sfBuilderProvider.builders.condition;
            var array = sfBuilderProvider.builders.array;
            var tabs = function (args) {
                if (args.form.tabs && args.form.tabs.length > 0) {
                    var tabContent = args.fieldFrag.querySelector('.tab-content');
                    args.form.tabs.forEach(function (tab, index) {
                        var div = document.createElement('div');
                        div.className = 'tab-pane';
                        div.setAttribute('ng-disabled', 'form.readonly');
                        div.setAttribute('ng-show', 'selected.tab === ' + index);
                        div.setAttribute('ng-class', '{active: selected.tab === ' + index + '}');
                        var childFrag = args.build(tab.items, args.path + '.tabs[' + index + '].items', args.state);
                        div.appendChild(childFrag);
                        tabContent.appendChild(div);
                    });
                }
            };
            var defaults = [
                sfField,
                ngModel,
                ngModelOptions,
                condition
            ];
            decoratorsProvider.defineDecorator('bootstrapDecorator', {
                textarea: {
                    template: base + 'textarea.html',
                    builder: defaults
                },
                fieldset: {
                    template: base + 'fieldset.html',
                    builder: [
                        sfField,
                        simpleTransclusion,
                        condition
                    ]
                },
                array: {
                    template: base + 'array.html',
                    builder: [
                        sfField,
                        ngModelOptions,
                        ngModel,
                        array,
                        condition
                    ]
                },
                tabarray: {
                    template: base + 'tabarray.html',
                    builder: [
                        sfField,
                        ngModelOptions,
                        ngModel,
                        array,
                        condition
                    ]
                },
                tabs: {
                    template: base + 'tabs.html',
                    builder: [
                        sfField,
                        ngModelOptions,
                        tabs,
                        condition
                    ]
                },
                section: {
                    template: base + 'section.html',
                    builder: [
                        sfField,
                        simpleTransclusion,
                        condition
                    ]
                },
                conditional: {
                    template: base + 'section.html',
                    builder: [
                        sfField,
                        simpleTransclusion,
                        condition
                    ]
                },
                actions: {
                    template: base + 'actions.html',
                    builder: defaults
                },
                select: {
                    template: base + 'select.html',
                    builder: defaults
                },
                checkbox: {
                    template: base + 'checkbox.html',
                    builder: defaults
                },
                checkboxes: {
                    template: base + 'checkboxes.html',
                    builder: [
                        sfField,
                        ngModelOptions,
                        ngModel,
                        array,
                        condition
                    ]
                },
                number: {
                    template: base + 'default.html',
                    builder: defaults
                },
                password: {
                    template: base + 'default.html',
                    builder: defaults
                },
                submit: {
                    template: base + 'submit.html',
                    builder: defaults
                },
                button: {
                    template: base + 'submit.html',
                    builder: defaults
                },
                radios: {
                    template: base + 'radios.html',
                    builder: defaults
                },
                'radios-inline': {
                    template: base + 'radios-inline.html',
                    builder: defaults
                },
                radiobuttons: {
                    template: base + 'radio-buttons.html',
                    builder: defaults
                },
                help: {
                    template: base + 'help.html',
                    builder: defaults
                },
                'default': {
                    template: base + 'default.html',
                    builder: defaults
                }
            }, []);
        }
    ]);
    return;
});
define('SeedModules.PageBuilder/modules/boot', [
    'require',
    'exports',
    'angular',
    'app/application',
    'SeedModules.AngularUI/js/seed/bootstrap-decorator'
], function (require, exports, angular) {
    'use strict';
    return angular.module('modules.pagebuilder.boot', ['schemaForm']);
});
define('SeedModules.AngularUI/modules/configs/enums/extendFormFields', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var ExtendFormFields;
    (function (ExtendFormFields) {
        ExtendFormFields['row'] = 'row';
        ExtendFormFields['column'] = 'column';
        ExtendFormFields['panel'] = 'panel';
        ExtendFormFields['container'] = 'container';
        ExtendFormFields['table'] = 'table';
        ExtendFormFields['switch'] = 'switch';
        ExtendFormFields['navbar'] = 'navbar';
    }(ExtendFormFields = exports.ExtendFormFields || (exports.ExtendFormFields = {})));
});
define('SeedModules.AngularUI/modules/configs/enums/defaultFormTypes', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var DefaultFormTypes;
    (function (DefaultFormTypes) {
        DefaultFormTypes['fieldset'] = 'fieldset';
        DefaultFormTypes['section'] = 'section';
        DefaultFormTypes['actions'] = 'actions';
        DefaultFormTypes['text'] = 'text';
        DefaultFormTypes['textarea'] = 'textarea';
        DefaultFormTypes['number'] = 'number';
        DefaultFormTypes['password'] = 'password';
        DefaultFormTypes['checkbox'] = 'checkbox';
        DefaultFormTypes['checkboxes'] = 'checkboxes';
        DefaultFormTypes['select'] = 'select';
        DefaultFormTypes['submit'] = 'submit';
        DefaultFormTypes['button'] = 'button';
        DefaultFormTypes['radios'] = 'radios';
        DefaultFormTypes['radiosInline'] = 'radios-inline';
        DefaultFormTypes['radiobuttons'] = 'radiobuttons';
        DefaultFormTypes['help'] = 'help';
        DefaultFormTypes['template'] = 'template';
        DefaultFormTypes['tab'] = 'tab';
        DefaultFormTypes['tabs'] = 'tabs';
        DefaultFormTypes['array'] = 'array';
        DefaultFormTypes['tabarray'] = 'tabarray';
        DefaultFormTypes['subforms'] = 'subforms';
    }(DefaultFormTypes = exports.DefaultFormTypes || (exports.DefaultFormTypes = {})));
});
define('SeedModules.PageBuilder/modules/providers/defaultTools', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/configs/enums/extendFormFields',
    'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes'
], function (require, exports, extendFormFields_1, defaultFormTypes_1) {
    'use strict';
    exports.__esModule = true;
    var DefaultToolsConfig = function () {
        function DefaultToolsConfig(toolsBuilderProvider) {
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.row,
                icon: 'fas fa-window-minimize',
                name: '行',
                container: true,
                fields: ['htmlClass']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.column,
                icon: 'fas fa-columns',
                name: '列',
                container: true,
                fields: ['flex']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.container,
                name: '容器',
                icon: 'fas fa-expand',
                container: true,
                fields: ['htmlClass']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.panel,
                name: '面板',
                icon: 'far fa-window-maximize',
                container: true,
                fields: [
                    'title',
                    'notitle',
                    'theme',
                    'titleIcon'
                ]
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.navbar,
                name: '导航栏',
                icon: 'fas fa-bars',
                container: true,
                fields: [
                    'htmlClass',
                    'theme'
                ]
            });
            toolsBuilderProvider.addControl('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.section,
                name: '节点',
                icon: 'fab fa-delicious',
                container: true,
                fields: ['htmlClass']
            });
            toolsBuilderProvider.addControl('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.tabs,
                name: '选项卡组',
                container: 'tabs',
                fields: []
            });
            toolsBuilderProvider.addControl('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.tab,
                name: '选项卡',
                container: true,
                fields: [
                    'title',
                    'titleIcon'
                ]
            });
            toolsBuilderProvider.addControl('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                name: '文本输入',
                container: false,
                fields: [
                    'title',
                    'description',
                    'notitle',
                    'required',
                    'readonly',
                    'placeholder',
                    'textRange'
                ]
            });
            toolsBuilderProvider.addControl('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.textarea,
                name: '文本域',
                container: false,
                fields: [
                    'title',
                    'description',
                    'notitle',
                    'required',
                    'readonly',
                    'placeholder',
                    'textRange'
                ]
            });
            toolsBuilderProvider.addControl('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.select,
                name: '选择框',
                icon: 'fas fa-check-square',
                container: false,
                fields: [
                    'title',
                    'description',
                    'notitle',
                    'required',
                    'readonly'
                ]
            });
        }
        DefaultToolsConfig.$inject = ['SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'];
        return DefaultToolsConfig;
    }();
    exports.DefaultToolsConfig = DefaultToolsConfig;
});
define('SeedModules.PageBuilder/modules/providers/defaultToolFields', [
    'require',
    'exports',
    'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes'
], function (require, exports, defaultFormTypes_1) {
    'use strict';
    exports.__esModule = true;
    var DefaultToolFieldsConfig = function () {
        function DefaultToolFieldsConfig(toolsBuilderProvider) {
            toolsBuilderProvider.addControlProperty('基本', 'readonly', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '只读',
                key: 'readonly'
            });
            toolsBuilderProvider.addControlProperty('基本', 'title', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '标题',
                key: 'title'
            });
            toolsBuilderProvider.addControlProperty('基本', 'description', {
                type: 'textarea',
                title: '描述',
                key: 'description'
            });
            toolsBuilderProvider.addControlProperty('基本', 'notitle', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '隐藏标题',
                key: 'notitle'
            });
            toolsBuilderProvider.addControlProperty('基本', 'placeholder', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '水印',
                key: 'placeholder'
            });
            toolsBuilderProvider.addControlProperty('验证', 'required', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '必填',
                key: 'required'
            });
            toolsBuilderProvider.addControlProperty('验证', 'textRange', {
                type: defaultFormTypes_1.DefaultFormTypes.section,
                title: '字符长度',
                htmlClass: 'row',
                items: [
                    {
                        type: 'section',
                        htmlClass: 'col-xs-6',
                        items: [{
                                key: 'schema["minLength"]',
                                title: '最小长度',
                                type: 'number'
                            }]
                    },
                    {
                        type: 'section',
                        htmlClass: 'col-xs-6',
                        items: [{
                                key: 'schema["maxLength"]',
                                title: '最大长度',
                                type: 'number'
                            }]
                    }
                ]
            });
            toolsBuilderProvider.addControlProperty('布局', 'flex', {
                type: defaultFormTypes_1.DefaultFormTypes.number,
                title: '宽度',
                key: 'flex'
            });
            toolsBuilderProvider.addControlProperty('样式', 'htmlClass', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '自定义样式',
                key: 'htmlClass'
            });
            toolsBuilderProvider.addControlProperty('样式', 'theme', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '主题',
                key: 'theme'
            });
            toolsBuilderProvider.addControlProperty('样式', 'titleIcon', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '标题图标',
                key: 'titleIcon'
            });
        }
        DefaultToolFieldsConfig.$inject = ['SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'];
        return DefaultToolFieldsConfig;
    }();
    exports.DefaultToolFieldsConfig = DefaultToolFieldsConfig;
});
define('SeedModules.PageBuilder/modules/providers/toolsBuilder', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/boot',
    'angular',
    'SeedModules.PageBuilder/modules/providers/defaultTools',
    'SeedModules.PageBuilder/modules/providers/defaultToolFields'
], function (require, exports, boot, angular, defaultTools_1, defaultToolFields_1) {
    'use strict';
    exports.__esModule = true;
    var ToolsBuilderService = function () {
        function ToolsBuilderService(defaultTools, defaultToolFields) {
            this.defaultTools = defaultTools;
            this.defaultToolFields = defaultToolFields;
        }
        ToolsBuilderService.prototype.getControlProperties = function (type) {
            var self = this;
            var tool = this.getControl(type);
            if (!tool)
                return null;
            var form = {};
            angular.forEach(self.defaultToolFields, function (fields, category) {
                form[category] = form[category] || {};
                angular.forEach(tool.fields, function (field) {
                    if (typeof field === 'string' && fields[field]) {
                        form[category][field] = fields[field];
                    } else {
                        var controlField = field;
                        form[category][controlField.name] = fields[controlField.name];
                    }
                });
            });
            return form;
        };
        ToolsBuilderService.prototype.getControl = function (type) {
            var tools = this.getControls();
            var selectedTool = null;
            angular.forEach(tools, function (tool, category) {
                var selected = $.grep(tool, function (t, i) {
                    return type && type.length > 0 ? t.type === type : false;
                });
                if (selected.length > 0) {
                    selectedTool = selected[0];
                    return false;
                }
            });
            return selectedTool;
        };
        ToolsBuilderService.prototype.getControls = function () {
            return this.defaultTools;
        };
        return ToolsBuilderService;
    }();
    var ToolsBuilderProvider = function () {
        function ToolsBuilderProvider(defaultTools, defaultToolFields) {
            this.defaultTools = defaultTools;
            this.defaultToolFields = defaultToolFields;
            this.service = new ToolsBuilderService(this.defaultTools, this.defaultToolFields);
        }
        ToolsBuilderProvider.prototype.addControlProperty = function (category, name, form) {
            this.defaultToolFields[category] = this.defaultToolFields[category] || {};
            this.defaultToolFields[category][name] = form;
        };
        ToolsBuilderProvider.prototype.getControl = function (category, name) {
            if (!this.defaultTools[category])
                return null;
            var existed = $.grep(this.defaultTools[category], function (item, idx) {
                return item.name === name;
            });
            return existed && existed.length > 0 ? existed[0] : null;
        };
        ToolsBuilderProvider.prototype.addControl = function (category, tool) {
            this.defaultTools[category] = this.defaultTools[category] ? this.defaultTools[category] : [];
            var existed = $.grep(this.defaultTools[category], function (item, idx) {
                return item.name === tool.name;
            });
            tool.icon = tool.icon || 'fas fa-puzzle-piece';
            if (!existed || existed.length <= 0) {
                this.defaultTools[category].push(tool);
            } else {
                existed = angular.extend(existed, tool);
            }
        };
        ToolsBuilderProvider.prototype.$get = function () {
            return this.service;
        };
        ToolsBuilderProvider.$inject = [
            'SeedModules.PageBuilder/modules/configs/defaultTools',
            'SeedModules.PageBuilder/modules/configs/defaultToolFields'
        ];
        return ToolsBuilderProvider;
    }();
    var ConfigToolsClass = function () {
        function ConfigToolsClass(toolsBuilderProvider) {
        }
        ConfigToolsClass.$inject = ['SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'];
        return ConfigToolsClass;
    }();
    boot.constant('SeedModules.PageBuilder/modules/configs/defaultTools', {}).constant('SeedModules.PageBuilder/modules/configs/defaultToolFields', { 基本: [] }).provider('SeedModules.PageBuilder/modules/providers/toolsBuilder', ToolsBuilderProvider).config(defaultToolFields_1.DefaultToolFieldsConfig).config(defaultTools_1.DefaultToolsConfig);
});
define('SeedModules.PageBuilder/modules/configs/run', [
    'require',
    'exports',
    'SeedModules.PageBuilder/modules/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var ConfigRouteClass = function () {
        function ConfigRouteClass($stateProvider) {
            $stateProvider.state('admin.pagebuilder_db', {
                url: '/pagebuilder_db',
                title: '数据库',
                templateUrl: '/SeedModules.PageBuilder/modules/components/database/master.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_page', {
                url: '/pagebuilder_page',
                title: '页面管理',
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/page.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_pageform', {
                url: '/pagebuilder_pageform/{id}',
                title: '页面编辑',
                templateUrl: '/SeedModules.PageBuilder/modules/components/builder/pageForm.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_datasource', {
                url: '/pagebuilder_datasource',
                title: '数据源管理',
                templateUrl: '/SeedModules.PageBuilder/modules/components/datasource/list.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_dsform', {
                url: '/pagebuilder_dsform',
                title: '数据源编辑',
                templateUrl: '/SeedModules.PageBuilder/modules/components/datasource/form.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
            $stateProvider.state('admin.pagebuilder_threetest', {
                url: '/pagebuilder_threetest',
                title: '三维测试',
                templateUrl: '/SeedModules.PageBuilder/modules/components/three/page.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.PageBuilder/modules/requires'
                ]
            });
        }
        ConfigRouteClass.$inject = ['$stateProvider'];
        return ConfigRouteClass;
    }();
    var RunClass = function () {
        function RunClass($state, nav) {
            nav.add({
                text: '定制管理',
                icon: 'fab fa-fort-awesome fa-fw',
                order: 5,
                children: [
                    {
                        text: '数据库',
                        itemClicked: function (evt) {
                            $state.go('admin.pagebuilder_db');
                        }
                    },
                    {
                        text: '数据源管理',
                        itemClicked: function (evt) {
                            $state.go('admin.pagebuilder_datasource');
                        }
                    },
                    {
                        text: '页面管理',
                        itemClicked: function (evt) {
                            $state.go('admin.pagebuilder_page');
                        }
                    },
                    {
                        text: '服务管理',
                        itemClicked: function (evt) {
                            alert('我就一个人而且只有晚上有时间\uFF0C辣么多功能不得一点点完成啊');
                        }
                    },
                    {
                        text: '三维测试',
                        itemClicked: function (evt) {
                            $state.go('admin.pagebuilder_threetest');
                        }
                    }
                ]
            });
        }
        RunClass.$inject = [
            '$state',
            'SeedModules.Admin/modules/admin/configs/nav'
        ];
        return RunClass;
    }();
    boot.config(ConfigRouteClass).run(RunClass);
});
define('SeedModules.PageBuilder/modules/module', [
    'require',
    'exports',
    'angular',
    'SeedModules.PageBuilder/modules/providers/toolsBuilder',
    'SeedModules.PageBuilder/modules/configs/run'
], function (require, exports, angular) {
    'use strict';
    return angular.module('modules.pagebuilder', ['modules.pagebuilder.boot']);
});