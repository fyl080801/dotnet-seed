/// <reference path="../../../../node_modules/@types/angular/index.d.ts" />

export as namespace AngularUI;

export = AngularUI;

declare namespace AngularUI {
  export namespace configs {
    export interface ISeedAppConfig extends app.IAppConfig {
      siteSettings: any;
    }
  }

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

  export namespace services {
    export interface IRequestService {
      url(url: string): IWebApiContext;
    }

    export interface IWebApiContext extends IWebApi {
      options(options: IRequestOptions): IWebApi;
    }

    export interface IRequestOptions extends ng.IRequestConfig {
      showLoading?: boolean;
    }

    export interface IWebApi {
      get<TOutput>(): IRequestContext<TOutput>;
      post<TOutput>(data?: any): IRequestContext<TOutput>;
      put<TOutput>(data?: any): IRequestContext<TOutput>;
      patch<TOutput>(data?: any): IRequestContext<TOutput>;
      drop<TOutput>(): IRequestContext<TOutput>;
    }

    export interface IRequestContext<TOutput> {
      cancel();
      result: ng.IPromise<TOutput>;
    }
  }

  export namespace SchemaForm {
    export interface ISfBuilder {
      sfField(args);
      ngModel(args);
      simpleTransclusion(args);
      ngModelOptions(args);
      transclusion(args);
      condition(args);
      array(args);
    }

    export interface ISfBuilderProvider extends ng.IServiceProvider {
      builders: ISfBuilder;
      stdBuilders: Array<(args) => void>;
    }

    export interface ISfPathProvider extends ng.IServiceProvider {
      parse(str: string);
      stringify(arr: string[] | string);
      normalize(data: string[] | string);
    }

    export interface ISchemaFormProvider {
      defaults: {
        [key: string]: Array<(name: string, schema, options) => void>;
      };
      stdFormObj(name, schema, options): fields.IField;
      defaultFormDefinition(name, form: Array<any>, options);
      postProcess(fn: Function);
      appendRule(type, rule);
      prependRule(type, rule);
      createStandardForm(name, schema, options);
    }

    export interface ISchemaFormDecoratorsProvider extends ng.IServiceProvider {
      createDecorator(name: string, templates: { [type: string]: string });
      defineDecorator(
        name: string,
        fields: { [type: string]: IFieldMap },
        builders?: Array<any>
      );
      createDirective(type: string, templateUrl: string, transclude?: boolean);
      createDirectives(templates: { [type: string]: string });
      decorator(name): IFieldMap[];
      addMapping(
        name: string,
        type: string,
        url: string,
        builder?: Function | Array<Function>,
        replace?: boolean
      );
      defineAddOn(
        name: string,
        type: string,
        url: string,
        builder: Function | Array<Function>
      );
    }

    export interface IFieldMap {
      template: string;
      builder: Function | Array<Function>;
    }

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
      export type FieldTypes = IField | IButton | ISection | IRow | IPanel;

      export interface IField {
        key?: string | Array<string>; // The dot notatin to the attribute on the model
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

      export interface ISection {
        items: FieldTypes[];
        htmlClass?: string;
      }

      export interface IButton extends IField {
        icon?: string;
        onClick?: string | (() => any);
      }

      export interface IPanel extends IField {
        theme: string;
      }

      export interface IRow extends IField {
        columns: Array<IField>;
      }
    }
  }
}
