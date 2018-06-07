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

  export namespace SchemaForm {
    export interface ISchema {
      type: string;
      properties: { [key: string]: any };
    }

    export interface IPristine {
      errors?: boolean;
      success?: boolean;
    }

    export interface IOptions {
      supressPropertyTitles?: boolean;
      formDefaults?: object;
      validationMessage?: object | Function;
      setSchemaDefaults?: boolean;
      destroyStrategy?: string;
      pristine?: IPristine;
      validateOnRender?: boolean;
    }

    export namespace fields {
      export interface IField {
        key: string | Array<string>; // The dot notatin to the attribute on the model
        type?: string; // Type of field
        title?: string; // Title of field, taken from schema if available
        notitle?: boolean; // Set to true to hide title
        description?: string; // A description, taken from schema if available, can be HTML
        validationMessage?: string; // A custom validation error message
        onChange?: (key, modelValue) => any; // onChange event handler, expression or function
        feedback?: boolean; // Inline feedback icons
        disableSuccessState?: boolean; // Set true to NOT apply 'has-success' class to a field that was validated successfully
        disableErrorState?: boolean; // Set true to NOT apply 'has-error' class to a field that failed validation
        placeholder?: string; // placeholder on inputs and textarea
        ngModelOptions?: any; // Passed along to ng-model-options
        readonly?: boolean; // Same effect as readOnly in schema. Put on a fieldset or array and their items will inherit it.
        htmlClass?: string; // CSS Class(es) to be added to the container div
        fieldHtmlClass?: string; // CSS Class(es) to be added to field input (or similar)
        labelHtmlClass?: string; // CSS Class(es) to be added to the label of the field (or similar)
        copyValueTo?: Array<string>; // Copy values to these schema keys.
        condition?: string; // Show or hide field depending on an angular expression
        destroyStrategy?: string; // One of "null", "empty" , "remove", or 'retain'. Changes model on $destroy event. default is "remove".
      }

      export interface IButton extends IField {
        icon?: string;
        onClick?: string | (() => any);
      }
    }
  }
}
