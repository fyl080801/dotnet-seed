/// <reference path="../../../../node_modules/@types/angular/index.d.ts" />

export as namespace PageBuilder;

export = PageBuilder;

declare namespace PageBuilder {
  export namespace providers {
    export interface IToolsBuilderProvider extends ng.IServiceProvider {
      addTool(category: string, tool: PageBuilder.services.ITool);
      getTool(category: string, name: string): PageBuilder.services.ITool;
      addToolField(
        category: string,
        form: AngularUI.SchemaForm.fields.FieldTypes
      );
    }
  }

  export namespace services {
    export interface ITool {
      type: string;
      name: string;
      icon?: string;
      container?: boolean;
      fields: Array<IToolField | string>;
    }

    export interface IToolField {
      name: string;
      defaultValue?: any;
    }

    export type ToolsCollection = {
      [category: string]: PageBuilder.services.ITool[];
    };

    export type ToolFieldCollection = {
      [name: string]: AngularUI.SchemaForm.fields.FieldTypes[];
    };

    export interface IToolsBuilderService {
      getTools(): ToolsCollection;
      getTool(type: string): PageBuilder.services.ITool;
      getToolForm(type: string): PageBuilder.services.ToolFieldCollection;
    }
  }
}
