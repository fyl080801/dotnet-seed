define(["require", "exports", "SeedModules.MindPlus/modules/mind/module", "angular", "kityminder"], function (require, exports, mod, angular, kityminder) {
    "use strict";
    exports.__esModule = true;
    mod.factory('SeedModules.MindPlus/modules/mind/factories/minderInstance', [
        function () {
            var minderInit = function (options) {
                var minder = new kityminder.Minder({
                    renderTo: options.renderTo
                });
                for (var evt in options.events) {
                    minder.on(evt, options.events[evt] || angular.noop);
                }
                minder.on('normal.dblclick', function (e) { });
                minder.on('normal.mousedown', function (e) {
                    if (e.originEvent.button == 2) {
                    }
                });
                return minder;
            };
            return minderInit;
        }
    ]);
});
