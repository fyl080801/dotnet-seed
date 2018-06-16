import boot = require('SeedModules.PageBuilder/modules/boot');
import angular = require('angular');
import { DefaultToolsConfig } from 'SeedModules.PageBuilder/modules/providers/defaultTools';
import { DefaultToolFieldsConfig } from 'SeedModules.PageBuilder/modules/providers/defaultToolFields';

class ToolsBuilderService
  implements PageBuilder.services.IControlBuilderService {
  getControlProperties(
    type: string
  ): PageBuilder.services.ControlPropertyCollection {
    var self = this;
    var tool = this.getControl(type);
    if (!tool) return null;

    var form: PageBuilder.services.ControlPropertyCollection = {};
    angular.forEach(self.defaultToolFields, (fields, category) => {
      form[category] = form[category] || {};

      angular.forEach(tool.fields, field => {
        if (typeof field === 'string' && fields[field]) {
          form[category][field] = fields[field];
        } else {
          var controlField = <PageBuilder.services.IControlField>field;
          form[category][controlField.name] = fields[controlField.name];
        }
      });
    });
    return form;
  }

  getControl(type: string): PageBuilder.services.IControl {
    var tools = this.getControls();
    var selectedTool = null;
    angular.forEach(
      tools,
      (tool: PageBuilder.services.IControl[], category: string) => {
        var selected = $.grep(
          tool,
          (t: PageBuilder.services.IControl, i: number) => {
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

  getControls(): PageBuilder.services.ControlCollection {
    return this.defaultTools;
  }

  constructor(
    private defaultTools: PageBuilder.services.ControlCollection,
    private defaultToolFields: PageBuilder.services.ControlPropertyCollection
  ) {}
}

class ToolsBuilderProvider
  implements PageBuilder.providers.IControlBuilderProvider {
  addControlProperty(
    category: string,
    name: string,
    form: AngularUI.SchemaForm.fields.FieldTypes
  ) {
    this.defaultToolFields[category] = this.defaultToolFields[category] || {};
    this.defaultToolFields[category][name] = form;
  }

  getControl(category: string, name: string): PageBuilder.services.IControl {
    if (!this.defaultTools[category]) return null;

    var existed = $.grep(this.defaultTools[category], (item, idx) => {
      return item.name === name;
    });

    return existed && existed.length > 0 ? existed[0] : null;
  }

  addControl(category: string, tool: PageBuilder.services.IControl) {
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

  private service: PageBuilder.services.IControlBuilderService;

  static $inject = [
    'SeedModules.PageBuilder/modules/configs/defaultTools',
    'SeedModules.PageBuilder/modules/configs/defaultToolFields'
  ];
  constructor(
    private defaultTools: PageBuilder.services.ControlCollection,
    private defaultToolFields: PageBuilder.services.ControlPropertyCollection
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
    toolsBuilderProvider: PageBuilder.providers.IControlBuilderProvider
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
