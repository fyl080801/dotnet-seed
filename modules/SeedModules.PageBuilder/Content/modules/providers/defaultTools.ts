import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';

export class DefaultToolsConfig {
  static $inject = [
    'SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'
  ];
  constructor(
    toolsBuilderProvider: PageBuilder.providers.IControlBuilderProvider
  ) {
    // 布局控件
    toolsBuilderProvider.addControl('布局', {
      type: ExtendFormFields.row,
      icon: 'fas fa-window-minimize',
      name: '行',
      container: true,
      fields: ['htmlClass']
    });
    toolsBuilderProvider.addControl('布局', {
      type: ExtendFormFields.column,
      icon: 'fas fa-columns',
      name: '列',
      container: true,
      fields: ['flex']
    });
    toolsBuilderProvider.addControl('布局', {
      type: ExtendFormFields.container,
      name: '容器',
      icon: 'fas fa-expand',
      container: true,
      fields: ['htmlClass']
    });
    toolsBuilderProvider.addControl('布局', {
      type: ExtendFormFields.panel,
      name: '面板',
      icon: 'far fa-window-maximize',
      container: true,
      fields: ['title', 'notitle', 'theme', 'titleIcon']
    });
    toolsBuilderProvider.addControl('布局', {
      type: ExtendFormFields.navbar,
      name: '导航栏',
      icon: 'fas fa-bars',
      container: true,
      fields: ['htmlClass', 'theme']
    });
    toolsBuilderProvider.addControl('布局', {
      type: DefaultFormTypes.section,
      name: '节点',
      icon: 'fab fa-delicious',
      container: true,
      fields: ['htmlClass']
    });
    toolsBuilderProvider.addControl('布局', {
      type: DefaultFormTypes.tabs,
      name: '选项卡组',
      container: 'tabs',
      fields: []
    });
    toolsBuilderProvider.addControl('布局', {
      type: DefaultFormTypes.tab,
      name: '选项卡',
      container: true,
      fields: ['title', 'titleIcon']
    });

    // 常规控件
    toolsBuilderProvider.addControl('常规', {
      type: DefaultFormTypes.text,
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
      type: DefaultFormTypes.textarea,
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
      type: DefaultFormTypes.select,
      name: '选择框',
      icon: 'fas fa-check-square',
      container: false,
      fields: ['title', 'description', 'notitle', 'required', 'readonly']
    });
  }
}
