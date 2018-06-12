define(["require", "exports", "SeedModules.PageBuilder/modules/boot", "angular", "SeedModules.AngularUI/modules/configs/enums/extendFormFields", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes"], function (require, exports, boot, angular, extendFormFields_1, defaultFormTypes_1) {
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
        function ToolsBuilderProvider(defaultTools, defaultToolFields) {
            this.defaultTools = defaultTools;
            this.defaultToolFields = defaultToolFields;
            this.service = new ToolsService(this.defaultTools);
        }
        ToolsBuilderProvider.prototype.addToolField = function (category, form) {
            this.defaultToolFields[category] = this.defaultToolFields[category]
                ? this.defaultToolFields[category]
                : [];
            this.defaultToolFields[category].push(form);
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
            toolsBuilderProvider.addToolField('基本', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '别名',
                key: 'alias'
            });
            toolsBuilderProvider.addToolField('基本', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '可为空',
                key: 'required'
            });
            toolsBuilderProvider.addToolField('基本', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '只读',
                key: 'readonly'
            });
            toolsBuilderProvider.addToolField('基本', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '标题',
                key: 'title'
            });
            toolsBuilderProvider.addToolField('基本', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '水印',
                key: 'placeholder'
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.row,
                name: '行',
                haveItems: true,
                fields: [
                    {
                        name: 'alias',
                        defaultValue: '行'
                    }
                ]
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.column,
                name: '列',
                haveItems: true,
                fields: [
                    {
                        name: 'alias',
                        defaultValue: '列'
                    }
                ]
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.container,
                name: '容器',
                haveItems: true,
                fields: [
                    {
                        name: 'alias',
                        defaultValue: '容器'
                    }
                ]
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.panel,
                name: '面板',
                haveItems: true,
                fields: [
                    {
                        name: 'alias',
                        defaultValue: '面板'
                    },
                    'title'
                ]
            });
            toolsBuilderProvider.addTool('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.section,
                name: '节点',
                haveItems: true,
                fields: [
                    {
                        name: 'alias',
                        defaultValue: '节点'
                    }
                ]
            });
        }
        ConfigToolsClass.$inject = [
            'SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'
        ];
        return ConfigToolsClass;
    }());
    boot
        .provider('SeedModules.PageBuilder/modules/providers/toolsBuilder', ToolsBuilderProvider)
        .config(ConfigToolsClass);
});
//# sourceMappingURL=toolsBuilder.js.map