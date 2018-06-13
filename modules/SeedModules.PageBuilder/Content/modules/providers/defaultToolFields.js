define(["require", "exports", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes", "SeedModules.AngularUI/modules/configs/enums/dataTypes"], function (require, exports, defaultFormTypes_1, dataTypes_1) {
    "use strict";
    exports.__esModule = true;
    var DefaultToolFieldsConfig = (function () {
        function DefaultToolFieldsConfig(toolsBuilderProvider) {
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
            toolsBuilderProvider.addToolField('基本', 'notitle', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '隐藏标题',
                key: 'notitle'
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
                title: '宽度',
                key: 'flex'
            });
            toolsBuilderProvider.addToolField('样式', 'htmlClass', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '自定义样式',
                key: 'htmlClass'
            });
            toolsBuilderProvider.addToolField('样式', 'theme', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '主题',
                key: 'theme'
            });
            toolsBuilderProvider.addToolField('样式', 'titleIcon', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '标题图标',
                key: 'titleIcon'
            });
        }
        DefaultToolFieldsConfig.$inject = [
            'SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'
        ];
        return DefaultToolFieldsConfig;
    }());
    exports.DefaultToolFieldsConfig = DefaultToolFieldsConfig;
});
//# sourceMappingURL=defaultToolFields.js.map