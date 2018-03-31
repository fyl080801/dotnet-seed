define(['SeedModules.MindPlus/ui/myworks/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/ui/myworks/controllers/workItem', [
    '$scope',
    'SeedModules.AngularUI/ui/factories/schemaFormParams',
    function($scope, schemaFormParams) {
      $scope.formParams = new schemaFormParams().properties({
        title: {
          title: '任务名称',
          type: 'string',
          required: true
        }
      });

      $scope.formFields = ['title'];
    }
  ]);
});
