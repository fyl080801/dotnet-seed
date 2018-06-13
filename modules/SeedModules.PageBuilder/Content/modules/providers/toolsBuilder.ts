import boot = require('SeedModules.PageBuilder/modules/boot');
import angular = require('angular');
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';
import { DataTypes } from 'SeedModules.AngularUI/modules/configs/enums/dataTypes';

class ToolsBuilderService implements PageBuilder.services.IToolsBuilderService {
  getToolForm(type: string): PageBuilder.services.ToolFieldCollection {
    var self = this;
    var tool = this.getTool(type);
    if (!tool) return null;

    var form: PageBuilder.services.ToolFieldCollection = {};
    angular.forEach(self.defaultToolFields, (fields, category) => {
      form[category] = form[category] || {};

      angular.forEach(tool.fields, (field, idx) => {
        if (fields[field]) {
          form[category][field] = fields[field];
        }
      });
    });
    return form;
  }

  getTool(type: string): PageBuilder.services.ITool {
    var tools = this.getTools();
    var selectedTool = null;
    angular.forEach(
      tools,
      (tool: PageBuilder.services.ITool[], category: string) => {
        var selected = $.grep(
          tool,
          (t: PageBuilder.services.ITool, i: number) => {
            return type && type.length > 0 ? t.type === type : false;
          }
        );
        if (selected.length > 0) {
          selectedTool = selected[0];
          return false;
        }
      }
    );
    return selectedTool;
  }

  getTools(): PageBuilder.services.ToolsCollection {
    return this.defaultTools;
  }

  constructor(
    private defaultTools: PageBuilder.services.ToolsCollection,
    private defaultToolFields: PageBuilder.services.ToolFieldCollection
  ) {}
}

class ToolsBuilderProvider
  implements PageBuilder.providers.IToolsBuilderProvider {
  addToolField(
    category: string,
    name: string,
    form: AngularUI.SchemaForm.fields.FieldTypes
  ) {
    this.defaultToolFields[category] = this.defaultToolFields[category] || {};
    this.defaultToolFields[category][name] = form;
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
    private defaultTools: PageBuilder.services.ToolsCollection,
    private defaultToolFields: PageBuilder.services.ToolFieldCollection
  ) {
    this.service = new ToolsBuilderService(
      this.defaultTools,
      this.defaultToolFields
    );
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
    toolsBuilderProvider.addToolField('基本', 'placeholder', {
      type: DefaultFormTypes.text,
      title: '水印',
      key: 'placeholder'
    });

    toolsBuilderProvider.addToolField('数据', 'key', {
      type: DefaultFormTypes.text,
      title: '字段',
      key: 'key'
    });
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

    toolsBuilderProvider.addToolField('布局', 'flex', {
      type: DefaultFormTypes.number,
      dataType: DataTypes.number,
      title: '宽度',
      key: 'flex'
    });

    toolsBuilderProvider.addToolField('样式', 'htmlClass', {
      type: DefaultFormTypes.text,
      dataType: DataTypes.string,
      title: 'CSS',
      key: 'htmlClass'
    });
    toolsBuilderProvider.addToolField('样式', 'theme', {
      type: DefaultFormTypes.text,
      dataType: DataTypes.string,
      title: '主题',
      key: 'theme'
    });

    // 控件
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.row,
      name: '行',
      container: true,
      fields: ['alias']
    });
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.column,
      name: '列',
      container: true,
      fields: ['alias', 'flex']
    });
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.container,
      name: '容器',
      container: true,
      fields: ['alias']
    });
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.panel,
      name: '面板',
      container: true,
      fields: ['alias', 'title', 'theme']
    });
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.navbar,
      name: '导航栏',
      container: true,
      fields: ['alias', 'htmlClass', 'theme']
    });
    toolsBuilderProvider.addTool('布局', {
      type: DefaultFormTypes.section,
      name: '节点',
      container: true,
      fields: ['alias', 'htmlClass']
    });

    toolsBuilderProvider.addTool('常规', {
      type: DefaultFormTypes.text,
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
      type: DefaultFormTypes.textarea,
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
      type: DefaultFormTypes.select,
      name: '选择框',
      container: false,
      fields: ['alias', 'title', 'required', 'readonly', 'key']
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
