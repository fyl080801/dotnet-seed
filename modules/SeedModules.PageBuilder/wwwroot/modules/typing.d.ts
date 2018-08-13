/// <reference path="../../../../node_modules/@types/angular/index.d.ts" />

export as namespace PageBuilder;

export = PageBuilder;

declare namespace PageBuilder {
  /**
   * 数据源列表(独立出来)
   */
  export type SourceActionTable = { [key: string]: ISourceAction };

  /**
   * 数据源(独立出来)
   */
  export interface ISchemaSource {
    data: any;
    properties: { [key: string]: AngularUI.SchemaForm.ISchema };
    actions: { [key: string]: ISourceAction };
  }

  /**
   * 数据行为(独立出来)
   */
  export interface ISourceAction {
    (source, data): ng.IPromise<any>;
  }

  export namespace providers {
    /**
     * 注册数据源(独立出来)
     */
    export interface ISourceActionProvider extends ng.IServiceProvider {
      register(name: string, action: ISourceAction);
    }

    export interface IControlBuilderProvider extends ng.IServiceProvider {
      addControl(category: string, control: PageBuilder.services.IControl);
      getControl(category: string, name: string): PageBuilder.services.IControl;
      addControlProperty(
        category: string,
        name: string,
        form: AngularUI.SchemaForm.fields.FieldTypes
      );
    }
  }

  export namespace services {
    /**
     * 获取数据源(独立出来)
     */
    export interface ISchemaSourceService {
      resolve(name: string): ISourceAction;
    }

    export interface IControl {
      type: string;
      name: string;
      icon?: string;
      container?: boolean | string;
      fields: Array<string | IControlField>;
      onAdded?(form: AngularUI.SchemaForm.fields.FieldTypes);
    }

    export interface IControlField {
      name: string;
      defaultValue?: any;
    }

    export type ControlCollection = {
      [category: string]: PageBuilder.services.IControl[];
    };

    export type ControlPropertyCollection = {
      [category: string]: {
        [control: string]: AngularUI.SchemaForm.fields.FieldTypes;
      };
    };

    export interface IControlBuilderService {
      getControls(): ControlCollection;
      getControl(type: string): PageBuilder.services.IControl;
      getControlProperties(
        type: string
      ): PageBuilder.services.ControlPropertyCollection;
    }
  }
}
