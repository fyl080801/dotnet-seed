import boot = require('SeedModules.PageBuilder/modules/boot');
import angular = require('angular');
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';

class ToolsService implements PageBuilder.services.IToolsBuilderService {
  constructor(
    private defaultTools: { [category: string]: PageBuilder.services.ITool[] }
  ) {}
  getTools(): { [category: string]: PageBuilder.services.ITool[] } {
    return this.defaultTools;
  }
}

class ToolsBuilderProvider
  implements PageBuilder.providers.IToolsBuilderProvider {
  addToolField(category: string, form: AngularUI.SchemaForm.fields.FieldTypes) {
    this.defaultToolFields[category] = this.defaultToolFields[category]
      ? this.defaultToolFields[category]
      : [];
    this.defaultToolFields[category].push(form);
  }

  getTool(category: string, name: string): PageBuilder.services.ITool {
    if (!this.defaultTools[category]) return null;

    var existed = $.grep(this.defaultTools[category], (item, idx) => {
      return item.name === name;
    });

    return existed && existed.length > 0 ? existed[0] : null;
  }

  addTool(category: string, tool: PageBuilder.services.ITool) {
    this.defaultTools[category] = this.defaultTools[category]
      ? this.defaultTools[category]
      : [];
    var existed = $.grep(this.defaultTools[category], (item, idx) => {
      return item.name === tool.name;
    });

    if (!existed || existed.length <= 0) {
      this.defaultTools[category].push(tool);
    } else {
      existed = angular.extend(existed, tool);
    }
  }

  $get() {
    return this.service;
  }

  private service: PageBuilder.services.IToolsBuilderService;

  static $inject = [
    'SeedModules.PageBuilder/modules/configs/defaultTools',
    'SeedModules.PageBuilder/modules/configs/defaultToolFields'
  ];
  constructor(
    private defaultTools: { [category: string]: PageBuilder.services.ITool[] },
    private defaultToolFields: {
      [name: string]: AngularUI.SchemaForm.fields.FieldTypes[];
    }
  ) {
    this.service = new ToolsService(this.defaultTools);
  }
}

class ConfigToolsClass {
  static $inject = [
    'SeedModules.PageBuilder/modules/providers/toolsBuilderProvider'
  ];
  constructor(
    toolsBuilderProvider: PageBuilder.providers.IToolsBuilderProvider
  ) {
    // 控件属性字段
    toolsBuilderProvider.addToolField('基本', {
      type: DefaultFormTypes.text,
      title: '别名',
      key: 'alias'
    });
    toolsBuilderProvider.addToolField('基本', {
      type: DefaultFormTypes.checkbox,
      title: '可为空',
      key: 'required'
    });
    toolsBuilderProvider.addToolField('基本', {
      type: DefaultFormTypes.checkbox,
      title: '只读',
      key: 'readonly'
    });
    toolsBuilderProvider.addToolField('基本', {
      type: DefaultFormTypes.text,
      title: '标题',
      key: 'title'
    });
    toolsBuilderProvider.addToolField('基本', {
      type: DefaultFormTypes.text,
      title: '水印',
      key: 'placeholder'
    });

    // 控件
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.row,
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
      type: ExtendFormFields.column,
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
      type: ExtendFormFields.container,
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
      type: ExtendFormFields.panel,
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
      type: DefaultFormTypes.section,
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
}

boot
  .constant('SeedModules.PageBuilder/modules/configs/defaultTools', {})
  .constant('SeedModules.PageBuilder/modules/configs/defaultToolFields', {
    基本: []
  })
  .provider(
    'SeedModules.PageBuilder/modules/providers/toolsBuilder',
    ToolsBuilderProvider
  )
  .config(ConfigToolsClass);
