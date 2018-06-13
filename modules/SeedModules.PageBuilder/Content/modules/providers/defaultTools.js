define(["require", "exports", "SeedModules.AngularUI/modules/configs/enums/extendFormFields", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes"], function (require, exports, extendFormFields_1, defaultFormTypes_1) {
    "use strict";
    exports.__esModule = true;
    var DefaultToolsConfig = (function () {
        function DefaultToolsConfig(toolsBuilderProvider) {
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.row,
                icon: 'fas fa-window-minimize',
                name: '行',
                container: true,
                fields: ['alias', 'htmlClass']
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.column,
                icon: 'fas fa-columns',
                name: '列',
                container: true,
                fields: ['alias', 'flex']
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.container,
                name: '容器',
                icon: 'fas fa-expand',
                container: true,
                fields: ['alias']
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.panel,
                name: '面板',
                icon: 'far fa-window-maximize',
                container: true,
                fields: ['alias', 'title', 'notitle', 'theme', 'titleIcon']
            });
            toolsBuilderProvider.addTool('布局', {
                type: extendFormFields_1.ExtendFormFields.navbar,
                name: '导航栏',
                icon: 'fas fa-bars',
                container: true,
                fields: ['alias', 'htmlClass', 'theme']
            });
            toolsBuilderProvider.addTool('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.section,
                name: '节点',
                icon: 'fab fa-buromobelexperte',
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
                    'notitle',
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
                    'notitle',
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
                icon: 'fas fa-check-square',
                container: false,
                fields: ['alias', 'title', 'required', 'readonly', 'key']
            });
            toolsBuilderProvider.addTool('高级', {
                type: defaultFormTypes_1.DefaultFormTypes.tabs,
                name: '选项卡组',
                container: 'tabs',
                fields: ['alias']
            });
            toolsBuilderProvider.addTool('高级', {
                type: defaultFormTypes_1.DefaultFormTypes.tab,
                name: '选项卡',
                container: true,
                fields: ['alias', 'title', 'titleIcon']
            });
        }
        DefaultToolsConfig.$inject = [
            'SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'
        ];
        return DefaultToolsConfig;
    }());
    exports.DefaultToolsConfig = DefaultToolsConfig;
});
//# sourceMappingURL=defaultTools.js.map