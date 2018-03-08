define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/users', [
    '$scope',
    '$modal',
    '$q',
    '$timeout',
    'app.services.popupService',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableRequest',
    'SeedModules.AngularUI/ui/factories/schemaFormParams',
    'schemaFormDecorators',
    function(
      $scope,
      $modal,
      $q,
      $timeout,
      popupService,
      requestService,
      ngTableRequest,
      schemaFormParams,
      schemaFormDecorators
    ) {
      $scope.tableParams = new ngTableRequest({
        url: '/api/admin/users/query',
        showLoading: false
      }).ngTableParams();

      $scope.formParams = new schemaFormParams().properties({
        username: {
          title: '用户名',
          type: 'string',
          required: true
        },
        lastName: {
          title: '姓',
          type: 'string'
        },
        firstName: {
          title: '名',
          type: 'string'
        },
        email: {
          title: '邮箱',
          type: 'string',
          required: true
        },
        password: {
          title: '初始密码',
          type: 'string',
          required: true
        },
        confirmPassword: {
          title: '密码确认',
          type: 'string',
          required: true
        }
      });

      $scope.form = [
        'username',
        {
          type: 'section',
          htmlClass: 'row',
          items: [
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: ['lastName']
            },
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: ['firstName']
            }
          ]
        },
        'email',
        {
          key: 'password',
          type: 'password'
        },
        {
          key: 'confirmPassword',
          type: 'password',
          validationMessage: {
            compare: '密码不一致'
          },
          compare: function(modelValue, model, form) {
            return modelValue === model.password;
          }
        }
      ];

      $scope.create = function() {
        $modal
          .open({
            templateUrl: 'SeedModules.AngularUI/ui/views/schemaConfirm.html',
            data: {
              title: '新建用户',
              formParams: $scope.formParams,
              form: $scope.form
            }
          })
          .result.then(function(data) {});
      };

      $scope.edit = function(row) {
        $modal
          .open({
            templateUrl: 'SeedModules.AngularUI/ui/views/schemaConfirm.html',
            data: {
              title: '新建用户',
              formParams: $scope.formParams,
              form: $scope.form,
              model: $.extend({}, row)
            }
          })
          .result.then(function(data) {});
      };

      $scope.drop = function(row) {
        popupService.confirm('是否删除用户？').ok(function() {});
      };
    }
  ]);
});
