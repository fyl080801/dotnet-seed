define(["require", "exports", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes"], function (require, exports, defaultFormTypes_1) {
    "use strict";
    exports.__esModule = true;
    var DefaultToolFieldsConfig = (function () {
        function DefaultToolFieldsConfig(toolsBuilderProvider) {
            toolsBuilderProvider.addControlProperty('基本', 'readonly', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '只读',
                key: 'readonly'
            });
            toolsBuilderProvider.addControlProperty('基本', 'title', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '标题',
                key: 'title'
            });
            toolsBuilderProvider.addControlProperty('基本', 'description', {
                type: 'textarea',
                title: '描述',
                key: 'description'
            });
            toolsBuilderProvider.addControlProperty('基本', 'notitle', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '隐藏标题',
                key: 'notitle'
            });
            toolsBuilderProvider.addControlProperty('基本', 'placeholder', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '水印',
                key: 'placeholder'
            });
            toolsBuilderProvider.addControlProperty('验证', 'required', {
                type: defaultFormTypes_1.DefaultFormTypes.checkbox,
                title: '必填',
                key: 'required'
            });
            toolsBuilderProvider.addControlProperty('验证', 'textRange', {
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
            toolsBuilderProvider.addControlProperty('布局', 'flex', {
                type: defaultFormTypes_1.DefaultFormTypes.number,
                title: '宽度',
                key: 'flex'
            });
            toolsBuilderProvider.addControlProperty('样式', 'htmlClass', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '自定义样式',
                key: 'htmlClass'
            });
            toolsBuilderProvider.addControlProperty('样式', 'theme', {
                type: defaultFormTypes_1.DefaultFormTypes.text,
                title: '主题',
                key: 'theme'
            });
            toolsBuilderProvider.addControlProperty('样式', 'titleIcon', {
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