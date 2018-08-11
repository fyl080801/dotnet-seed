define(["require", "exports", "SeedModules.AngularUI/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    function filter() {
        return function (val, type) {
            var result = {};
            $.each(val, function (name, val) {
                if (typeof val === type) {
                    result[name] = val;
                }
            });
            return result;
        };
    }
    mod.filter('itemType', filter);
});
//# sourceMappingURL=itemType.js.map