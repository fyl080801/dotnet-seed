import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';

export class DefaultToolFieldsConfig {
  static $inject = [
    'SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'
  ];
  constructor(
    toolsBuilderProvider: PageBuilder.providers.IControlBuilderProvider
  ) {
    // 基本属性字段
    toolsBuilderProvider.addControlProperty('基本', 'readonly', {
      type: DefaultFormTypes.checkbox,
      title: '只读',
      key: 'readonly'
    });
    toolsBuilderProvider.addControlProperty('基本', 'title', {
      type: DefaultFormTypes.text,
      title: '标题',
      key: 'title'
    });
    toolsBuilderProvider.addControlProperty('基本', 'notitle', {
      type: DefaultFormTypes.checkbox,
      title: '隐藏标题',
      key: 'notitle'
    });
    toolsBuilderProvider.addControlProperty('基本', 'placeholder', {
      type: DefaultFormTypes.text,
      title: '水印',
      key: 'placeholder'
    });

    // 验证字段
    toolsBuilderProvider.addControlProperty('验证', 'required', {
      type: DefaultFormTypes.checkbox,
      title: '必填',
      key: 'schema["required"]'
    });
    toolsBuilderProvider.addControlProperty('验证', 'textRange', {
      type: DefaultFormTypes.section,
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

    // 布局字段
    toolsBuilderProvider.addControlProperty('布局', 'flex', {
      type: DefaultFormTypes.number,
      title: '宽度',
      key: 'flex'
    });

    // 样式字段
    toolsBuilderProvider.addControlProperty('样式', 'htmlClass', {
      type: DefaultFormTypes.text,
      title: '自定义样式',
      key: 'htmlClass'
    });
    toolsBuilderProvider.addControlProperty('样式', 'theme', {
      type: DefaultFormTypes.text,
      title: '主题',
      key: 'theme'
    });
    toolsBuilderProvider.addControlProperty('样式', 'titleIcon', {
      type: DefaultFormTypes.text,
      title: '标题图标',
      key: 'titleIcon'
    });
  }
}
