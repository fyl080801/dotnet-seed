import mod = require('SeedModules.PageBuilder/modules/module');
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';

interface IFormScope extends ng.IScope {
  vm: ControllerClass;
  sfForm: AngularUI.SchemaForm.ISchemaForm;
}

class ControllerClass {
  static $inject = ['$scope', '$state', '$modal', 'app/services/popupService'];
  constructor(
    private $scope: IFormScope,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;
    $scope.sfForm = {
      form: [
        {
          type: DefaultFormTypes.section,
          htmlClass: 'row',
          items: [
            {
              type: DefaultFormTypes.section,
              htmlClass: 'col-md-6',
              items: ['name']
            },
            {
              type: DefaultFormTypes.section,
              htmlClass: 'col-md-6',
              items: [
                {
                  key: 'sourceType',
                  type: DefaultFormTypes.select
                }
              ]
            }
          ]
        },
        {
          type: DefaultFormTypes.textarea,
          key: 'description'
        }
      ],
      model: {},
      options: {},
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', title: '名称', required: true },
          description: { type: 'string', title: '描述' },
          sourceType: { type: 'string', title: '类型', required: true }
        }
      }
    };
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/datasource/baseinfo',
  ControllerClass
);
