define(["require", "exports", "SeedModules.PageBuilder/modules/boot", "angular", "SeedModules.PageBuilder/modules/providers/defaultTools", "SeedModules.PageBuilder/modules/providers/defaultToolFields"], function (require, exports, boot, angular, defaultTools_1, defaultToolFields_1) {
    "use strict";
    exports.__esModule = true;
    var ToolsBuilderService = (function () {
        function ToolsBuilderService(defaultTools, defaultToolFields) {
            this.defaultTools = defaultTools;
            this.defaultToolFields = defaultToolFields;
        }
        ToolsBuilderService.prototype.getToolForm = function (type) {
            var self = this;
            var tool = this.getTool(type);
            if (!tool)
                return null;
            var form = {};
            angular.forEach(self.defaultToolFields, function (fields, category) {
                form[category] = form[category] || {};
                angular.forEach(tool.fields, function (field, idx) {
                    if (fields[field]) {
                        form[category][field] = fields[field];
                    }
                });
            });
            return form;
        };
        ToolsBuilderService.prototype.getTool = function (type) {
            var tools = this.getTools();
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
        ToolsBuilderService.prototype.getTools = function () {
            return this.defaultTools;
        };
        return ToolsBuilderService;
    }());
    var ToolsBuilderProvider = (function () {
        function ToolsBuilderProvider(defaultTools, defaultToolFields) {
            this.defaultTools = defaultTools;
            this.defaultToolFields = defaultToolFields;
            this.service = new ToolsBuilderService(this.defaultTools, this.defaultToolFields);
        }
        ToolsBuilderProvider.prototype.addToolField = function (category, name, form) {
            this.defaultToolFields[category] = this.defaultToolFields[category] || {};
            this.defaultToolFields[category][name] = form;
        };
        ToolsBuilderProvider.prototype.getTool = function (category, name) {
            if (!this.defaultTools[category])
                return null;
            var existed = $.grep(this.defaultTools[category], function (item, idx) {
                return item.name === name;
            });
            return existed && existed.length > 0 ? existed[0] : null;
        };
        ToolsBuilderProvider.prototype.addTool = function (category, tool) {
            this.defaultTools[category] = this.defaultTools[category]
                ? this.defaultTools[category]
                : [];
            var existed = $.grep(this.defaultTools[category], function (item, idx) {
                return item.name === tool.name;
            });
            tool.icon = tool.icon || 'fas fa-puzzle-piece';
            if (!existed || existed.length <= 0) {
                this.defaultTools[category].push(tool);
            }
            else {
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
    }());
    var ConfigToolsClass = (function () {
        function ConfigToolsClass(toolsBuilderProvider) {
        }
        ConfigToolsClass.$inject = [
            'SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'
        ];
        return ConfigToolsClass;
    }());
    boot
        .constant('SeedModules.PageBuilder/modules/configs/defaultTools', {})
        .constant('SeedModules.PageBuilder/modules/configs/defaultToolFields', {
        基本: []
    })
        .provider('SeedModules.PageBuilder/modules/providers/toolsBuilder', ToolsBuilderProvider)
        .config(defaultToolFields_1.DefaultToolFieldsConfig)
        .config(defaultTools_1.DefaultToolsConfig);
});
//# sourceMappingURL=toolsBuilder.js.map