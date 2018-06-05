define(["require", "exports", "SeedModules.PageBuilder/modules/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var ToolsService = (function () {
        function ToolsService(defaultTools) {
            this.defaultTools = defaultTools;
        }
        ToolsService.prototype.getTools = function () {
            return this.defaultTools;
        };
        return ToolsService;
    }());
    var ToolsBuilderProvider = (function () {
        function ToolsBuilderProvider(defaultTools) {
            this.defaultTools = defaultTools;
        }
        ToolsBuilderProvider.prototype.addTool = function (category, name, tool) { };
        ToolsBuilderProvider.prototype.$get = function () {
            return new ToolsService(this.defaultTools);
        };
        ToolsBuilderProvider.$inject = ['SeedModules.PageBuilder/modules/configs/defaultTools'];
        return ToolsBuilderProvider;
    }());
    boot.provider('SeedModules.PageBuilder/modules/providers/toolsBuilder', ToolsBuilderProvider);
});
//# sourceMappingURL=toolsBuilder.js.map