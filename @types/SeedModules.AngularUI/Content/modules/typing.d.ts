/// <reference path="../../../../node_modules/@types/angular/index.d.ts" />

export as namespace modules;

export = modules;

declare namespace modules {
  export namespace factories {
    export interface INgTableColumn {
      class(): string;
      headerTemplateURL(): any | boolean;
      headerTitle(): string;
      sortable(): boolean;
      show(): boolean;
      title(): string;
      titleAlt(): string;
    }
  }
}
