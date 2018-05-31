import { schemaFormParamsFactory } from 'SeedModules.AngularUI/modules/factories/schemaFormParams';

interface ISettingsScope extends ng.IScope {
  formParams;
  form: Array<any>;
}

export class SettingsController {
  static $inject = [
    '$scope',
    'SeedModules.AngularUI/modules/factories/schemaFormParams'
  ];
  constructor(private $scope: ISettingsScope, private schemaFormParams) {
    $scope.formParams = new schemaFormParams();
    $scope.form = [];
  }
}
