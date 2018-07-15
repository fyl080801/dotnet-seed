define(["require", "exports", "angular", "SeedModules.AngularUI/modules/module"], function (require, exports, angular, mod) {
    "use strict";
    exports.__esModule = true;
    var defaults = {
        "class": function () {
            return '';
        },
        headerTemplateURL: function () {
            return false;
        },
        headerTitle: function () {
            return '';
        },
        sortable: function () {
            return false;
        },
        show: function () {
            return true;
        },
        title: function () {
            return '';
        },
        titleAlt: function () {
            return '';
        }
    };
    function ngTableColumnFactory() {
        function buildColumn(column, defaultScope) {
            var extendedCol = Object.create(column);
            for (var prop in defaults) {
                if (extendedCol[prop] === undefined) {
                    extendedCol[prop] = defaults[prop];
                }
                if (!angular.isFunction(extendedCol[prop])) {
                    (function (prop1) {
                        extendedCol[prop1] = function () {
                            return column[prop1];
                        };
                    })(prop);
                }
                (function (prop1) {
                    var getterFn = extendedCol[prop1];
                    extendedCol[prop1] = function () {
                        if (arguments.length === 0) {
                            return getterFn.call(column, defaultScope);
                        }
                        else {
                            return getterFn.apply(column, arguments);
                        }
                    };
                })(prop);
            }
            return extendedCol;
        }
        return {
            buildColumn: buildColumn
        };
    }
    mod.factory('SeedModules.AngularUI/modules/factories/ngTableColumn', ngTableColumnFactory);
});
//# sourceMappingURL=ngTableColumn.js.map