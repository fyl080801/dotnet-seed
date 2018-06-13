define(["require", "exports", "SeedModules.PageBuilder/modules/boot", "angular", "SeedModules.AngularUI/modules/configs/enums/extendFormFields", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes", "SeedModules.AngularUI/modules/configs/enums/dataTypes"], function (require, exports, boot, angular, extendFormFields_1, defaultFormTypes_1, dataTypes_1) {
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
            toolsBuilderProvider.addToolField('基本', 'alias', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                dataType: dataTypes_1.DataTypes.string,
                title: '别名',
                key: 'alias'
            });
            toolsBuilderProvider.addToolField('基本', 'required', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '必填',
                key: 'schema["required"]'
            });
            toolsBuilderProvider.addToolField('基本', 'readonly', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '只读',
                key: 'readonly'
            });
            toolsBuilderProvider.addToolField('基本', 'title', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '标题',
                key: 'title'
            });
            toolsBuilderProvider.addToolField('基本', 'placeholder', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '水印',
                key: 'placeholder'
            });
            toolsBuilderProvider.addToolField('数据', 'key', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '字段',
                key: 'key'
            });
            toolsBuilderProvider.addToolField('数据', 'textRange', {
                type: defaultFormTypes_1.DefaultFormTypes.section,
                title: '字符长度',
                htmlClass: 'row',
                items: [
                    {
                        type: 'section',
                        htmlClass: 'col-xs-6',
                        items: [
                            {
                                key: 'schema["minLength"]',
                                title: '最小长度',
                                type: 'number'
                            }
                        ]
                    },
                    {
                        type: 'section',
                        htmlClass: 'col-xs-6',
                        items: [
                            {
                                key: 'schema["maxLength"]',
                                title: '最大长度',
                                type: 'number'
                            }
                        ]
                    }
                ]
            });
            toolsBuilderProvider.addToolField('布局', 'flex', {
                type: defaultFormTypes_1.DefaultFormTypes.number,
                dataType: dataTypes_1.DataTypes.number,
                title: '宽度',
                key: 'flex'
            });
            toolsBuilderProvider.addToolField('样式', 'htmlClass', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                dataType: dataTypes_1.DataTypes.string,
                title: 'CSS',
                key: 'htmlClass'
            });
            toolsBuilderProvider.addToolField('样式', 'theme', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                dataType: dataTypes_1.DataTypes.string,
                title: '主题',
                key: 'theme'
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.row,
                name: '行',
                container: true,
                fields: ['alias']
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.column,
                name: '列',
                container: true,
                fields: ['alias', 'flex']
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.container,
                name: '容器',
                container: true,
                fields: ['alias']
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.panel,
                name: '面板',
                container: true,
                fields: ['alias', 'title', 'theme']
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.navbar,
                name: '导航栏',
                container: true,
                fields: ['alias', 'htmlClass', 'theme']
            });
            toolsBuilderProvider.addTool('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.section,
                name: '节点',
                container: true,
                fields: ['alias', 'htmlClass']
            });
            toolsBuilderProvider.addTool('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                name: '文本输入',
                container: false,
                fields: [
                    'alias',
                    'title',
                    'required',
                    'readonly',
                    'placeholder',
                    'key',
                    'textRange'
                ]
            });
            toolsBuilderProvider.addTool('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.textarea,
                name: '文本域',
                container: false,
                fields: [
                    'alias',
                    'title',
                    'required',
                    'readonly',
                    'placeholder',
                    'key',
                    'textRange'
                ]
            });
            toolsBuilderProvider.addTool('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.select,
                name: '选择框',
                container: false,
                fields: ['alias', 'title', 'required', 'readonly', 'key']
            });
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
        .config(ConfigToolsClass);
});
//# sourceMappingURL=toolsBuilder.js.map