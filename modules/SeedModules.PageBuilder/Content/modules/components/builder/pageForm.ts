import mod = require('SeedModules.PageBuilder/modules/module');
import angular = require('angular');
import { SchemaTypes } from 'SeedModules.AngularUI/modules/configs/enums/schemaTypes';
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';
import 'rcss!/SeedModules.PageBuilder/css/page-builder.css';

interface ISchemaInfo {
  form: Array<AngularUI.SchemaForm.fields.FieldTypes | string>;
  schema: AngularUI.SchemaForm.ISchema;
  options: AngularUI.SchemaForm.IOptions;
  model: any;
}

interface IPageFormScope extends ng.IScope {
  pagename: string;
  editor: ISchemaInfo;
  form: ISchemaInfo;
}

class PageFormClass {
  back() {
    this.$state.go('admin.pagebuilder_page');
  }

  preview() {
    this.$modal.open({
      templateUrl:
        '/SeedModules.PageBuilder/modules/components/builder/preview.html',
      size: 'lg',
      scope: this.$scope
    });
  }

  static $inject = ['$scope', '$rootScope', '$state', '$modal'];
  constructor(
    private $scope: IPageFormScope,
    private $rootScope: ng.IRootScopeService,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService
  ) {
    // 设计器
    $scope.editor = {
      form: [
        {
          type: ExtendFormFields.panel,
          title: 'aaaaaaaaa',
          theme: 'success',
          items: [
            {
              type: ExtendFormFields.row,
              items: [
                {
                  type: ExtendFormFields.column,
                  flex: 6,
                  items: [
                    {
                      key: 'source1.lastName',
                      type: DefaultFormTypes.text,
                      title: '姓'
                    }
                  ]
                },
                {
                  type: ExtendFormFields.column,
                  flex: 6,
                  items: [
                    {
                      key: 'source1.firstName',
                      type: DefaultFormTypes.text,
                      title: '名'
                    }
                  ]
                }
              ]
            },
            {
              key: 'source1.description',
              type: DefaultFormTypes.text,
              title: '描述'
            }
          ]
        },
        {
          type: ExtendFormFields.panel,
          title: '面板2',
          theme: 'info',
          items: [
            {
              key: 'category',
              type: 'select',
              title: '分类'
            }
          ]
        }
      ],
      schema: {
        type: SchemaTypes.object,
        properties: {
          source1: { type: 'object' }
        }
      },
      options: {},
      model: {}
    };

    // 页面属性
    this.$scope.form = {
      form: [
        {
          key: 'pagename',
          title: '页面名称',
          placeholder: '输入页面名称'
        }
      ],
      schema: {
        type: SchemaTypes.object,
        properties: {
          pagename: {
            type: 'string',
            required: true
          }
        }
      },
      options: {},
      model: {}
    };
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/pageForm',
  PageFormClass
);
