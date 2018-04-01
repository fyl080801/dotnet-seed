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

      $scope.formFields = [
        {
          key: 'title',
          placeholder: '输入任务名称'
        }
      ];

      $scope.queryCities = [
        { value: 1, text: 'Amsterdam', continent: 'Europe' },
        { value: 4, text: 'Washington', continent: 'America' },
        { value: 7, text: 'Sydney', continent: 'Australia' },
        { value: 10, text: 'Beijing', continent: 'Asia' },
        { value: 13, text: 'Cairo', continent: 'Africa' }
      ];
    }
  ]);
});
