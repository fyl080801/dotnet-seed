define(['SeedModules.Admin/modules/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/modules/admin/controllers/admin', [
    '$scope',
    '$state',
    '$modal',
    '$window',
    'app/services/popupService',
    'SeedModules.Admin/modules/admin/configs/nav',
    'SeedModules.AngularUI/modules/services/requestService',
    'SeedModules.AngularUI/modules/factories/schemaFormParams',
    function(
      $scope,
      $state,
      $modal,
      $window,
      popupService,
      nav,
      requestService,
      schemaFormParams
    ) {
      $scope.passwordFormParams = new schemaFormParams().properties({
        currentPassword: {
          title: '当前密码',
          type: 'string',
          required: true
        },
        password: {
          title: '新密码',
          type: 'string',
          required: true
        },
        confirmPassword: {
          title: '密码确认',
          type: 'string',
          required: true
        }
      });

      $scope.passwordForm = [
        {
          key: 'currentPassword',
          type: 'password'
        },
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

      $scope.sidebar = {};

      $scope.navData = nav.tree();

      $scope.logout = function() {
        popupService.confirm('是否退出？').ok(function() {
          requestService
            .url('/api/account/logout')
            .options({
              dataOnly: true
            })
            .post()
            .result.then(function() {
              $window.location.reload();
            });
        });
      };

      $scope.changePassword = function() {
        $modal
          .open({
            templateUrl:
              '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
            size: 'sm',
            data: {
              title: '修改密码',
              formParams: $scope.passwordFormParams,
              form: $scope.passwordForm,
              model: {}
            }
          })
          .result.then(function(data) {
            requestService
              .url('/api/admin/users/password')
              .patch(data)
              .result.then(function() {
                popupService.information('修改成功');
              });
          });
      };

      // $scope.testFn = function() {
      //   $('#testa').slideUp(300);
      // };
    }
  ]);
});
