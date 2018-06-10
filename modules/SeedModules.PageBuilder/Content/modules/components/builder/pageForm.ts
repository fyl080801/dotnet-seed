import mod = require('SeedModules.PageBuilder/modules/module');
import 'rcss!/SeedModules.PageBuilder/css/page-builder.css';
import { SchemaTypes } from 'SeedModules.AngularUI/modules/configs/enums/schemaTypes';
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/enums/extendFormFields';

interface IPageFormScope extends ng.IScope {
  pagename: string;
  form: Array<AngularUI.SchemaForm.fields.FieldTypes | string>;
  schema: AngularUI.SchemaForm.ISchema;
  options: AngularUI.SchemaForm.IOptions;
  model: any;
}

class PageFormClass {
  back() {
    this.$state.go('admin.pagebuilder_page');
  }

  refresh() {
    this.$scope.$broadcast('schemaFormRedraw');
  }

  static $inject = ['$scope', '$state', '$modal'];
  constructor(
    private $scope: IPageFormScope,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService
  ) {
    $scope.pagename = '';
    $scope.form = [
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
                    key: 'lastName',
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
                    key: 'firstName',
                    type: DefaultFormTypes.text,
                    title: '名'
                  }
                ]
              }
            ]
          },
          {
            key: 'description',
            type: DefaultFormTypes.text,
            title: '描述'
          }
        ]
      }
    ];
    $scope.model = {};
    $scope.schema = {
      type: SchemaTypes.object,
      properties: {
        //aaa: { type: 'string' }
      }
    };
    $scope.options = {};
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/builder/pageForm',
  PageFormClass
);
