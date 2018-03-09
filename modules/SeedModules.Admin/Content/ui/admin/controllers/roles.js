define(['SeedModules.Admin/ui/admin/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/admin/controllers/roles', [
    '$scope',
    '$modal',
    'app.services.popupService',
    'SeedModules.AngularUI/ui/services/requestService',
    'SeedModules.AngularUI/ui/factories/ngTableRequest',
    'SeedModules.AngularUI/ui/factories/schemaFormParams',
    function(
      $scope,
      $modal,
      popupService,
      requestService,
      ngTableRequest,
      schemaFormParams
    ) {
      $scope.roles = [];
      $scope.currentRole = null;
      $scope.tableParams = null;
      $scope.tableRequest = new ngTableRequest({
        showLoading: false
      });

      // 选择
      $scope.checkedAll = false;
      $scope.checked = {};

      $scope.checkAll = function() {
        $scope.checkedAll = !$scope.checkedAll;
        if ($scope.checkedAll) {
          $.each($scope.tableParams.data, function(idx, item) {
            $scope.checked[item.id] = true;
          });
        } else {
          $.each($scope.tableParams.data, function(idx, item) {
            $scope.checked[item.id] = false;
          });
        }
      };

      $scope.onCheck = function() {
        $scope.checkedAll = true;
        $.each($scope.tableParams.data, function(idx, item) {
          if (!$scope.checked[item.id]) {
            $scope.checkedAll = false;
            return false;
          }
        });
      };

      // 方法
      $scope.roleForm = new schemaFormParams().properties({
        rolename: {
          title: '名称',
          type: 'string',
          required: true
        }
      });

      $scope.loadRoles = function() {
        requestService
          .url('/api/admin/roles')
          .options({
            showLoading: false
          })
          .get()
          .then(function(result) {
            $scope.roles = result;
          });
      };

      $scope.selectRole = function(role) {
        $scope.currentRole = role;
      };

      $scope.cancelEditing = function() {
        $scope.currentRole = null;
      };

      $scope.create = function() {
        $modal
          .open({
            templateUrl: '/SeedModules.AngularUI/ui/views/schemaConfirm.html',
            size: 'sm',
            data: {
              title: '新建角色',
              formParams: $scope.roleForm,
              form: ['rolename']
            }
          })
          .result.then(function(data) {
            requestService
              .url('/api/admin/roles')
              .post(data)
              .then(function(result) {
                $scope.loadRoles();
              });
          });
      };

      $scope.setName = function(role) {
        $modal
          .open({
            templateUrl: '/SeedModules.AngularUI/ui/views/schemaConfirm.html',
            size: 'sm',
            data: {
              title: '设置别名',
              formParams: new schemaFormParams().properties({
                displayName: {
                  title: '别名',
                  type: 'string'
                }
              }),
              form: ['displayName']
            }
          })
          .result.then(function(data) {
            requestService
              .url(
                '/api/admin/roles/' +
                  role.id +
                  '/displayname?name=' +
                  (data.displayName || '')
              )
              .patch()
              .then(function(result) {
                $scope.loadRoles();
              });
          });
      };

      $scope.addMember = function() {
        if (!$scope.currentRole) return;
        $modal
          .open({
            templateUrl: '/SeedModules.Admin/ui/admin/views/members.html',
            size: 'lg',
            data: {
              role: $scope.currentRole
            }
          })
          .result.then(function(data) {
            var postdata = [];

            $.each(data, function(idx, item) {
              if (item) {
                postdata.push(idx);
              }
            });

            if (postdata.length <= 0) return;

            requestService
              .url('/api/admin/roles/' + $scope.currentRole.id + '/members')
              .post({
                members: postdata
              })
              .then(function(result) {
                if ($scope.tableParams) {
                  $scope.tableParams.reload();
                }
              });
          });
      };

      $scope.removeMember = function(user) {
        if (!$scope.currentRole) return;

        popupService.confirm('是否删除成员？').ok(function() {
          var postdata = [];

          if (user) {
            postdata.push(user.id);
          } else {
            $.each($scope.checked, function(idx, item) {
              if (item) {
                postdata.push(idx);
              }
            });
          }

          if (postdata.length <= 0) return;

          requestService
            .url('/api/admin/roles/' + $scope.currentRole.id + '/members')
            .patch({
              members: postdata
            })
            .then(function(result) {
              if ($scope.tableParams) {
                $scope.tableParams.reload();
              }
            });
        });
      };

      $scope.loadRoleDetails = function(role) {
        $scope.checkedAll = false;
        $scope.checked = {};

        if (role === null) return;

        $scope.tableParams = $scope.tableRequest
          .options({
            url: '/api/admin/roles/' + role.id + '/members/query'
          })
          .ngTableParams();
      };

      $scope.$watch(function() {
        return $scope.currentRole;
      }, $scope.loadRoleDetails);
    }
  ]);
});
