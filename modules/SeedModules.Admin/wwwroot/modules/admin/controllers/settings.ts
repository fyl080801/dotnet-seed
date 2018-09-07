import mod = require('SeedModules.Admin/modules/admin/module');
import { DefaultFormTypes } from 'SeedModules.AngularUI/modules/configs/enums/defaultFormTypes';

interface ISettingsScope extends ng.IScope {
  vm: SettingsController;
  formParams;
  form: Array<any>;
  model: any;
}

class SettingsController {
  static $inject = [
    '$scope',
    'app/services/popupService',
    'SeedModules.AngularUI/modules/services/requestService',
    'SeedModules.AngularUI/modules/factories/schemaFormParams'
  ];
  constructor(
    private $scope: ISettingsScope,
    private popupService: app.services.IPopupService,
    private requestService: AngularUI.services.IRequestService,
    private schemaFormParams
  ) {
    $scope.vm = this;

    $scope.formParams = new schemaFormParams().properties({
      siteName: {
        title: '站点名称',
        type: 'string',
        required: true
      },
      homeRoute: {
        type: 'object',
        properties: {
          Area: {
            title: '模块',
            type: 'string'
          },
          Controller: {
            title: '控制器',
            type: 'string'
          },
          Action: {
            title: '路径',
            type: 'string'
          }
        }
      }
    });
    $scope.form = [
      'siteName',
      {
        type: DefaultFormTypes.section,
        htmlClass: 'row',
        items: [
          {
            type: DefaultFormTypes.section,
            htmlClass: 'col-md-4',
            items: ['homeRoute.Area']
          },
          {
            type: DefaultFormTypes.section,
            htmlClass: 'col-md-4',
            items: ['homeRoute.Controller']
          },
          {
            type: DefaultFormTypes.section,
            htmlClass: 'col-md-4',
            items: ['homeRoute.Action']
          }
        ]
      }
    ];
    $scope.model = {};

    requestService
      .url('/api/settings')
      .get()
      .result.then(result => {
        $scope.model = result;
      });
  }

  save() {
    this.requestService
      .url('/api/settings')
      .patch(this.$scope.model)
      .result.then(result => {
        this.popupService.information('保存成功');
      });
  }
}

mod.controller(
  'SeedModules.Admin/modules/admin/controllers/settings',
  SettingsController
);
