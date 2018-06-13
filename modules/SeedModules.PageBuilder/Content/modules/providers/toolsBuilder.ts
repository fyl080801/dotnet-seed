import boot = require('SeedModules.PageBuilder/modules/boot');
import angular = require('angular');
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';

class ToolsBuilderService implements PageBuilder.services.IToolsBuilderService {
  getToolForm(type: string): PageBuilder.services.ToolFieldCollection {
    var self = this;
    var tool = this.getTool(type);
    if (!tool) return null;

    var form: PageBuilder.services.ToolFieldCollection = {};
    angular.forEach(self.defaultToolFields, (fields, category) => {
      form[category] = form[category] || [];

      angular.forEach(fields, field => {
        angular.forEach(tool.fields, tf => {
          var current = null;
          if (typeof tf === 'string') {
            current = tf === field['key'] ? field : null;
          } else {
            current = tf.name === field['key'] ? field : null;
          }

          if (current) {
            form[category].push(current);
          }
        });
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
    private defaultToolFields: {
      [name: string]: AngularUI.SchemaForm.fields.FieldTypes[];
    }
  ) {}
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
    private defaultTools: PageBuilder.services.ToolsCollection,
    private defaultToolFields: {
      [name: string]: AngularUI.SchemaForm.fields.FieldTypes[];
    }
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

    toolsBuilderProvider.addToolField('数据', {
      type: DefaultFormTypes.text,
      title: '字段',
      key: 'key'
    });

    // 控件
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.row,
      name: '行',
      container: true,
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
      container: true,
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
      container: true,
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
      container: true,
      fields: [
        {
          name: 'alias',
          defaultValue: '面板'
        },
        'title'
      ]
    });
    toolsBuilderProvider.addTool('布局', {
      type: ExtendFormFields.navbar,
      name: '导航栏',
      container: true,
      fields: [
        {
          name: 'alias',
          defaultValue: '导航栏'
        }
      ]
    });
    toolsBuilderProvider.addTool('布局', {
      type: DefaultFormTypes.section,
      name: '节点',
      container: true,
      fields: [
        {
          name: 'alias',
          defaultValue: '节点'
        }
      ]
    });

    toolsBuilderProvider.addTool('常规', {
      type: DefaultFormTypes.text,
      name: '文本输入',
      container: false,
      fields: [
        {
          name: 'alias',
          defaultValue: '文本输入'
        },
        'title',
        'required',
        'readonly',
        'placeholder',
        {
          name: 'key',
          defaultValue: 'key'
        }
      ]
    });
    toolsBuilderProvider.addTool('常规', {
      type: DefaultFormTypes.textarea,
      name: '文本域',
      container: false,
      fields: [
        {
          name: 'alias',
          defaultValue: '文本域'
        },
        'title',
        'required',
        'readonly',
        'placeholder',
        {
          name: 'key',
          defaultValue: 'key'
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
