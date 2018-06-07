import mod = require('SeedModules.PageBuilder/modules/module');
import 'rcss!/SeedModules.PageBuilder/css/page-builder.css';
import { SchemaTypes } from 'SeedModules.PageBuilder/modules/configs/enums/schemaTypes';
import { DefaultFormTypes } from 'SeedModules.PageBuilder/modules/configs/enums/defaultFormTypes';
import { ExtendFormFields } from 'SeedModules.AngularUI/modules/configs/form/extendFormFields';

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
      // {
      //   type: ExtendFormFields.row,
      //   columns: [
      //     {
      //       flex: '6',
      //       items: [
      //         {
      //           key: ['aaa'],
      //           type: DefaultFormTypes.text,
      //           title: 'aaaa'
      //         }
      //       ]
      //     }
      //   ]
      // }
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
