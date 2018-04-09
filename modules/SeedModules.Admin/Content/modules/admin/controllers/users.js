define(['SeedModules.Admin/modules/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/modules/admin/controllers/users', [
    '$scope',
    '$modal',
    '$q',
    '$timeout',
    'app.services.popupService',
    'SeedModules.AngularUI/modules/services/requestService',
    'SeedModules.AngularUI/modules/factories/ngTableRequest',
    'SeedModules.AngularUI/modules/factories/schemaFormParams',
    function(
      $scope,
      $modal,
      $q,
      $timeout,
      popupService,
      requestService,
      ngTableRequest,
      schemaFormParams
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
          type: 'section',
          htmlClass: 'row',
          items: [
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: [
                {
                  key: 'password',
                  type: 'password'
                }
              ]
            },
            {
              type: 'section',
              htmlClass: 'col-xs-6',
              items: [
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
              ]
            }
          ]
        }
      ];

      $scope.create = function() {
        $modal
          .open({
            templateUrl: 'SeedModules.AngularUI/modules/views/schemaConfirm.html',
            data: {
              title: '新建用户',
              formParams: $scope.formParams,
              form: $scope.form
            }
          })
          .result.then(function(data) {
            requestService
              .url('/api/admin/users')
              .post(data)
              .then(function(result) {
                $scope.tableParams.reload();
              });
          });
      };

      $scope.resetPassword = function(row) {
        $modal
          .open({
            templateUrl: 'SeedModules.AngularUI/modules/views/schemaConfirm.html',
            size: 'sm',
            data: {
              title: '重置密码',
              formParams: new schemaFormParams().properties({
                password: {
                  title: '新密码',
                  type: 'string',
                  required: true
                }
              }),
              form: [
                {
                  key: 'password',
                  type: 'password'
                }
              ],
              model: {}
            }
          })
          .result.then(function(data) {
            requestService
              .url('/api/admin/users/password/' + row.id)
              .patch(data)
              .then(function(result) {
                popupService.information('重置成功');
              });
          });
      };

      $scope.drop = function(row) {
        popupService.confirm('是否删除用户？').ok(function() {
          requestService
            .url('/api/admin/users/' + row.id)
            .drop()
            .then(function(result) {
              $scope.tableParams.reload();
            });
        });
      };
    }
  ]);
});
