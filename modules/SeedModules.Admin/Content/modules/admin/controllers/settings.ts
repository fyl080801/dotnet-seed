interface ISettingsScope extends ng.IScope {
  form;
}

export class SettingsController {
  static $inject = [
    '$scope',
    'SeedModules.AngularUI/modules/factories/schemaFormParams'
  ];
  constructor(private $scope: ISettingsScope, private schemaFormParams) {
    $scope.form = new schemaFormParams();
  }
}
