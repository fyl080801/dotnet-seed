define(["require", "exports", "SeedModules.PageBuilder/modules/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var Service = (function () {
        function Service($sourceActionTable) {
            this.$sourceActionTable = $sourceActionTable;
        }
        Service.prototype.resolve = function (name) {
            return this.$sourceActionTable[name];
        };
        return Service;
    }());
    var Provider = (function () {
        function Provider($sourceActionTable) {
            this.$sourceActionTable = $sourceActionTable;
            this.service = new Service($sourceActionTable);
        }
        Provider.prototype.register = function (name, source) {
            this.$sourceActionTable[name] = source;
        };
        Provider.prototype.$get = function () {
            return this.service;
        };
        Provider.$inject = ['$sourceActionTable'];
        return Provider;
    }());
    boot.constant('$sourceActionTable', {}).provider('$schemaSource', Provider);
});
//# sourceMappingURL=actionSource.js.map