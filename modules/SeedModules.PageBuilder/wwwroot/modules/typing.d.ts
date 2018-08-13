/// <reference path="../../../../node_modules/@types/angular/index.d.ts" />

export as namespace PageBuilder;

export = PageBuilder;

declare namespace PageBuilder {
  export namespace providers {
    /**
     *
     */
    export interface ISchemaSourceProvider extends ng.IServiceProvider {
      register(sourceType: any);
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
     *
     */
    export interface ISchemaSourceService {}

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
