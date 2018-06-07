/// <reference path="../../../../node_modules/@types/angular/index.d.ts" />

export as namespace PageBuilder;

export = PageBuilder;

declare namespace PageBuilder {
  export namespace providers {
    export interface IToolsBuilderProvider extends ng.IServiceProvider {
      addTool(category: string, name: string, tool: any);
    }
  }

  export namespace services {
    export interface IToolsBuilderService {
      getTools(): any;
    }
  }
}
