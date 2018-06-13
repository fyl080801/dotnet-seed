import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';
import { DataTypes } from 'SeedModules.AngularUI/modules/configs/enums/dataTypes';

export class DefaultToolFieldsConfig {
  static $inject = [
    'SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'
  ];
  constructor(
    toolsBuilderProvider: PageBuilder.providers.IToolsBuilderProvider
  ) {
    // 基本属性字段
    toolsBuilderProvider.addToolField('基本', 'alias', {
      type: DefaultFormTypes.text,
      dataType: DataTypes.string,
      title: '别名',
      key: 'alias'
    });
    toolsBuilderProvider.addToolField('基本', 'required', {
      type: DefaultFormTypes.checkbox,
      title: '必填',
      key: 'schema["required"]'
    });
    toolsBuilderProvider.addToolField('基本', 'readonly', {
      type: DefaultFormTypes.checkbox,
      title: '只读',
      key: 'readonly'
    });
    toolsBuilderProvider.addToolField('基本', 'title', {
      type: DefaultFormTypes.text,
      title: '标题',
      key: 'title'
    });
    toolsBuilderProvider.addToolField('基本', 'notitle', {
      type: DefaultFormTypes.checkbox,
      title: '隐藏标题',
      key: 'notitle'
    });
    toolsBuilderProvider.addToolField('基本', 'placeholder', {
      type: DefaultFormTypes.text,
      title: '水印',
      key: 'placeholder'
    });

    // 数据字段
    toolsBuilderProvider.addToolField('数据', 'key', {
      type: DefaultFormTypes.text,
      title: '字段',
      key: 'key'
    });
    // toolsBuilderProvider.addToolField('数据', 'condition', {
    //   type: DefaultFormTypes.text,
    //   title: '简单表达式',
    //   key: 'condition'
    // });
    toolsBuilderProvider.addToolField('数据', 'textRange', {
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
    toolsBuilderProvider.addToolField('布局', 'flex', {
      type: DefaultFormTypes.number,
      title: '宽度',
      key: 'flex'
    });

    // 样式字段
    toolsBuilderProvider.addToolField('样式', 'htmlClass', {
      type: DefaultFormTypes.text,
      title: '自定义样式',
      key: 'htmlClass'
    });
    toolsBuilderProvider.addToolField('样式', 'theme', {
      type: DefaultFormTypes.text,
      title: '主题',
      key: 'theme'
    });
    toolsBuilderProvider.addToolField('样式', 'titleIcon', {
      type: DefaultFormTypes.text,
      title: '标题图标',
      key: 'titleIcon'
    });
  }
}
