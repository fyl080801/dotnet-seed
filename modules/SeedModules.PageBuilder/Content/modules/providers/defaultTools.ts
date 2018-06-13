import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';

export class DefaultToolsConfig {
  static $inject = [
    'SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'
  ];
  constructor(
    toolsBuilderProvider: PageBuilder.providers.IToolsBuilderProvider
  ) {
    // 布局控件
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.row,
      icon: 'fas fa-window-minimize',
      name: '行',
      container: true,
      fields: ['alias', 'htmlClass']
    });
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.column,
      icon: 'fas fa-columns',
      name: '列',
      container: true,
      fields: ['alias', 'flex']
    });
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.container,
      name: '容器',
      icon: 'fas fa-expand',
      container: true,
      fields: ['alias']
    });
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.panel,
      name: '面板',
      icon: 'far fa-window-maximize',
      container: true,
      fields: ['alias', 'title', 'notitle', 'theme', 'titleIcon']
    });
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.navbar,
      name: '导航栏',
      icon: 'fas fa-bars',
      container: true,
      fields: ['alias', 'htmlClass', 'theme']
    });
    toolsBuilderProvider.addTool('布局', {
      type: DefaultFormTypes.section,
      name: '节点',
      icon: 'fab fa-buromobelexperte',
      container: true,
      fields: ['alias', 'htmlClass']
    });

    // 常规控件
    toolsBuilderProvider.addTool('常规', {
      type: DefaultFormTypes.text,
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
      type: DefaultFormTypes.textarea,
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
      type: DefaultFormTypes.select,
      name: '选择框',
      icon: 'fas fa-check-square',
      container: false,
      fields: ['alias', 'title', 'required', 'readonly', 'key']
    });

    // 高级
    toolsBuilderProvider.addTool('高级', {
      type: DefaultFormTypes.tabs,
      name: '选项卡组',
      container: 'tabs',
      fields: ['alias']
    });
    toolsBuilderProvider.addTool('高级', {
      type: DefaultFormTypes.tab,
      name: '选项卡',
      container: true,
      fields: ['alias', 'title', 'titleIcon']
    });
  }
}
