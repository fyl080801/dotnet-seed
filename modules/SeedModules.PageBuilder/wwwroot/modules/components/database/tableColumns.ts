import mod = require('SeedModules.PageBuilder/modules/module');
import { tableform } from 'SeedModules.PageBuilder/modules/components/database/forms';
import { DataTypes } from 'SeedModules.PageBuilder/modules/configs/enums';

class Controller {
  static $inject = [
    '$scope',
    'SeedModules.AngularUI/modules/factories/schemaFormParams'
  ];
  constructor(private $scope, private schemaFormParams) {
    $scope.vm = this;

    $scope.dataTypes = DataTypes;

    $scope.$data = $.extend(
      $scope.$data || {},
      tableform(new schemaFormParams())
    );

    $scope.newColumn = {};
  }

  lengthDisabled(row) {
    return (
      row.type !== DataTypes.字符串 + '' && row.type !== DataTypes.小数 + ''
    );
  }

  accuracyDisabled(row) {
    return row.type !== DataTypes.小数 + '';
  }

  addColumn() {
    this.$scope.$data.model.columns = this.$scope.$data.model.columns || [];
    this.$scope.$data.model.columns.push($.extend({}, this.$scope.newColumn));
    this.$scope.newColumn = {};
  }

  removeColumn(idx) {
    this.$scope.$data.model.columns.splice(idx, 1);
  }
}

mod.controller(
  'SeedModules.PageBuilder/modules/components/database/tableColumns',
  Controller
);
