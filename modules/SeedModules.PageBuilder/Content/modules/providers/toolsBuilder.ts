import boot = require('SeedModules.PageBuilder/modules/boot');

class ToolsService implements PageBuilder.services.IToolsBuilderService {
  constructor(private defaultTools) {}
  getTools(): any {
    return this.defaultTools;
  }
}

class ToolsBuilderProvider
  implements PageBuilder.providers.IToolsBuilderProvider {
  addTool(category: string, name: string, tool: any) {}

  $get() {
    return new ToolsService(this.defaultTools);
  }

  static $inject = ['SeedModules.PageBuilder/modules/configs/defaultTools'];
  constructor(private defaultTools) {}
}

boot.provider(
  'SeedModules.PageBuilder/modules/providers/toolsBuilder',
  ToolsBuilderProvider
);
