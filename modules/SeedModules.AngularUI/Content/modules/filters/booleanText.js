define(["require", "exports", "SeedModules.AngularUI/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    mod.filter('booleanText', [
        function () {
            return function (val) {
                if (val === undefined ||
                    val === null ||
                    val === 0 ||
                    val === false ||
                    val === 'false' ||
                    val === 'False') {
                    return '否';
                }
                else {
                    return '是';
                }
            };
        }
    ]);
});
