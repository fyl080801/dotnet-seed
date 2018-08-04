import mod = require('SeedModules.Admin/modules/admin/module');

interface ISettingsScope extends ng.IScope {
  formParams;
  form: Array<any>;
}

class SettingsController {
  static $inject = [
    '$scope',
    'SeedModules.AngularUI/modules/factories/schemaFormParams'
  ];
  constructor(private $scope: ISettingsScope, private schemaFormParams) {
    $scope.formParams = new schemaFormParams();
    $scope.form = [];
  }
}

mod.controller(
  'SeedModules.Admin/modules/admin/controllers/settings',
  SettingsController
);
