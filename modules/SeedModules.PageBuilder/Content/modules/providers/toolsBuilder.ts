import boot = require('SeedModules.PageBuilder/modules/boot');
import angular = require('angular');
import { DefaultToolsConfig } from 'SeedModules.PageBuilder/modules/providers/defaultTools';
import { DefaultToolFieldsConfig } from 'SeedModules.PageBuilder/modules/providers/defaultToolFields';

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

    tool.icon = tool.icon || 'fas fa-puzzle-piece';

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
  ) {}
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
  .config(DefaultToolFieldsConfig)
  .config(DefaultToolsConfig);
