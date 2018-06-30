define(["require", "exports", "SeedModules.AngularUI/modules/configs/enums/extendFormFields", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes"], function (require, exports, extendFormFields_1, defaultFormTypes_1) {
    "use strict";
    exports.__esModule = true;
    var DefaultToolsConfig = (function () {
        function DefaultToolsConfig(toolsBuilderProvider) {
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.row,
                icon: 'fas fa-window-minimize',
                name: '行',
                container: true,
                fields: ['htmlClass']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.column,
                icon: 'fas fa-columns',
                name: '列',
                container: true,
                fields: ['flex']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.container,
                name: '容器',
                icon: 'fas fa-expand',
                container: true,
                fields: ['htmlClass']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.panel,
                name: '面板',
                icon: 'far fa-window-maximize',
                container: true,
                fields: ['title', 'notitle', 'theme', 'titleIcon']
            });
            toolsBuilderProvider.addControl('布局', {
                type: extendFormFields_1.ExtendFormFields.navbar,
                name: '导航栏',
                icon: 'fas fa-bars',
                container: true,
                fields: ['htmlClass', 'theme']
            });
            toolsBuilderProvider.addControl('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.section,
                name: '节点',
                icon: 'fab fa-delicious',
                container: true,
                fields: ['htmlClass']
            });
            toolsBuilderProvider.addControl('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.tabs,
                name: '选项卡组',
                container: 'tabs',
                fields: []
            });
            toolsBuilderProvider.addControl('布局', {
                type: defaultFormTypes_1.DefaultFormTypes.tab,
                name: '选项卡',
                container: true,
                fields: ['title', 'titleIcon']
            });
            toolsBuilderProvider.addControl('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                name: '文本输入',
                container: false,
                fields: [
                    'title',
                    'description',
                    'notitle',
                    'required',
                    'readonly',
                    'placeholder',
                    'textRange'
                ]
            });
            toolsBuilderProvider.addControl('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.textarea,
                name: '文本域',
                container: false,
                fields: [
                    'title',
                    'description',
                    'notitle',
                    'required',
                    'readonly',
                    'placeholder',
                    'textRange'
                ]
            });
            toolsBuilderProvider.addControl('常规', {
                type: defaultFormTypes_1.DefaultFormTypes.select,
                name: '选择框',
                icon: 'fas fa-check-square',
                container: false,
                fields: ['title', 'description', 'notitle', 'required', 'readonly']
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
