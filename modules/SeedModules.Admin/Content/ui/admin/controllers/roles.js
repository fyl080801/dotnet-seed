define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/roles', [
    '$scope',
    '$modal',
    'SeedModules.AngularUI/ui/factories/ngTableParams',
    function($scope, $modal, ngTableParams) {
      $scope.tableParams = new ngTableParams();

      $scope.create = function() {
        $modal
          .open({
            templateUrl: 'SeedModules.AngularUI/ui/views/schemaPopup.html',
            size: 'sm',
            data: {
              title: '新建角色',
              schema: {
                type: 'object',
                properties: {
                  rolename: {
                    title: '名称',
                    type: 'string'
                  }
                },
                required: ['rolename']
              },
              fields: [
                'rolename',
                {
                  type: 'actions',
                  style: 'pull-right',
                  items: [
                    {
                      type: 'button',
                      title: '确定',
                      style: 'btn-primary',
                      onClick: '$close($data.model)'
                    },
                    {
                      type: 'button',
                      title: '取消',
                      onClick: '$dismiss()'
                    }
                  ]
                }
              ],
              options: {},
              model: {}
            }
          })
          .result.then(function(data) {
            console.log(data);
          });
      };
    }
  ]);
});
