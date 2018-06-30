define(['SeedModules.AngularUI/modules/module'], function (module) {
    'use strict';
    module.factory('SeedModules.AngularUI/modules/factories/ngTableGetDataBcShim', [
        '$q',
        function ($q) {
            return createWrapper;
            function createWrapper(getDataFn) {
                return function getDataShim() {
                    var $defer = $q.defer();
                    var pData = getDataFn.apply(this, [$defer].concat(Array.prototype.slice.call(arguments)));
                    if (!pData) {
                        pData = $defer.promise;
                    }
                    return pData;
                };
            }
        }
    ]);
});
//# sourceMappingURL=ngTableGetDataBcShim.js.map