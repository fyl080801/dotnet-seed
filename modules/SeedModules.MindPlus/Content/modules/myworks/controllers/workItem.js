define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/controllers/workItem',
    [
      '$scope',
      'SeedModules.AngularUI/modules/factories/schemaFormParams',
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

        $scope.works = [
          {
            text: '项目集合',
            children: [
              {
                text: '下级目录',
                children: [
                  {
                    text: '项目1'
                  },
                  {
                    text: '项目2'
                  }
                ]
              },
              {
                text: '项目1'
              },
              {
                text: '项目2'
              }
            ]
          },
          {
            text: '集合2',
            children: [
              {
                text: 'aaa'
              }
            ]
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
    ]
  );
});
