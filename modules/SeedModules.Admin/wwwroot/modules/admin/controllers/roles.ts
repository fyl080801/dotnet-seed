import mod = require('SeedModules.Admin/modules/admin/module');
import angular = require('angular');
import $ = require('jquery');

class RolesController {
  checkAll() {
    this.$scope.checkedAll = !this.$scope.checkedAll;
    if (this.$scope.checkedAll) {
      angular.forEach(this.$scope.tableParams.data, item => {
        this.$scope.checked[item.id] = true;
      });
    } else {
      angular.forEach(this.$scope.tableParams.data, item => {
        this.$scope.checked[item.id] = false;
      });
    }
  }

  onCheck() {
    this.$scope.checkedAll = true;
    angular.forEach(this.$scope.tableParams.data, item => {
      if (!this.$scope.checked[item.id]) {
        this.$scope.checkedAll = false;
        return false;
      }
    });
  }

  loadRoles() {
    this.requestService
      .url('/api/admin/roles')
      .options({
        showLoading: false
      })
      .get()
      .result.then(result => {
        this.$scope.roles = result;
      });
  }

  selectRole(role) {
    this.$scope.currentRole = role;
  }

  loadRoleDetails(role) {
    this.$scope.checkedAll = false;
    this.$scope.checked = {};

    if (!role) return;

    this.$scope.tableParams = this.$scope.tableRequest
      .options({
        url: '/api/admin/roles/' + role.id + '/members/query'
      })
      .ngTableParams();
  }

  loadRolePermissions(role) {
    this.$scope.permissions = [];
    this.$scope.roleEnables = [];
    if (!role) return;

    this.requestService
      .url('/api/admin/roles/' + role.id + '/permission')
      .options({ showLoading: false })
      .get<any>()
      .result.then(result => {
        this.$scope.permissions = result.permissions;
        this.$scope.roleEnables = result.enables;
      });
  }

  hasPermission(per) {
    if (this.$scope.roleEnables) {
      return this.$scope.roleEnables.indexOf(per.name) >= 0;
    } else {
      return false;
    }
  }

  permissionChanged(per) {
    var idx = this.$scope.roleEnables.indexOf(per.name);
    if (idx >= 0) {
      this.$scope.roleEnables.splice(idx, 1);
    } else {
      this.$scope.roleEnables.push(per.name);
    }
  }

  isAllPermission(defd): boolean {
    var pers = this.$scope.permissions[defd];
    for (var i = 0; i < pers.length; i++) {
      if (this.$scope.roleEnables.indexOf(pers[i].name) < 0) {
        return false;
      }
    }
    return true;
  }

  changeAllPermission(defd) {
    var isAll = this.isAllPermission(defd);
    var pers = this.$scope.permissions[defd];
    if (!isAll) {
      for (var i = 0; i < pers.length; i++) {
        if (this.$scope.roleEnables.indexOf(pers[i].name) < 0) {
          this.$scope.roleEnables.push(pers[i].name);
        }
      }
    } else {
      for (var i = 0; i < pers.length; i++) {
        var idx = this.$scope.roleEnables.indexOf(pers[i].name);
        if (idx >= 0) {
          this.$scope.roleEnables.splice(idx, 1);
        }
      }
    }
  }

  saveRolePermission() {
    if (!this.$scope.currentRole) return;
    this.requestService
      .url('/api/admin/roles/' + this.$scope.currentRole.id + '/permission')
      .put(this.$scope.roleEnables)
      .result.then(() => {
        this.popupService.information('保存成功');
      });
  }

  static $inject = [
    '$scope',
    '$rootScope',
    '$modal',
    'app/services/popupService',
    'SeedModules.AngularUI/modules/services/requestService',
    'SeedModules.AngularUI/modules/factories/ngTableRequest',
    'SeedModules.AngularUI/modules/factories/schemaFormParams'
  ];
  constructor(
    private $scope,
    private $rootScope,
    private $modal: ng.ui.bootstrap.IModalService,
    private popupService: app.services.IPopupService,
    private requestService: AngularUI.services.IRequestService,
    private ngTableRequest,
    private schemaFormParams
  ) {
    $scope.vm = this;
    $scope.roles = [];
    $scope.currentRole = null;
    $scope.tableParams = null;
    $scope.tableRequest = new ngTableRequest({
      showLoading: false
    });

    // 选择
    $scope.checkedAll = false;
    $scope.checked = {};

    // 权限
    $scope.permissions = [];
    $scope.roleEnables = [];

    // 方法
    $scope.roleForm = new schemaFormParams().properties({
      rolename: {
        title: '名称',
        type: 'string',
        required: true
      }
    });

    $scope.cancelEditing = () => {
      $scope.currentRole = null;
    };

    $scope.create = () => {
      $modal
        .open({
          templateUrl:
            '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
          size: 'sm',
          scope: angular.extend($rootScope.$new(), {
            $data: {
              title: '新建角色',
              formParams: $scope.roleForm,
              form: ['rolename']
            }
          })
        })
        .result.then(data => {
          requestService
            .url('/api/admin/roles')
            .post(data)
            .result.then(result => {
              this.loadRoles();
            });
        });
    };

    $scope.drop = () => {
      popupService.confirm('是否删除角色？').ok(() => {
        requestService
          .url('/api/admin/roles/' + $scope.currentRole.id)
          .drop()
          .result.then(result => {
            $scope.currentRole = null;
            this.loadRoles();
          });
      });
    };

    $scope.setName = role => {
      $modal
        .open({
          templateUrl:
            '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
          size: 'sm',
          scope: angular.extend(this.$rootScope.$new(), {
            $data: {
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
        })
        .result.then(data => {
          requestService
            .url(
              '/api/admin/roles/' +
                role.id +
                '/displayname?name=' +
                (data.displayName || '')
            )
            .patch()
            .result.then(result => {
              this.loadRoles();
            });
        });
    };

    $scope.addMember = () => {
      if (!$scope.currentRole) return;
      $modal
        .open({
          templateUrl: '/SeedModules.Admin/modules/admin/views/members.html',
          size: 'lg',
          scope: angular.extend($rootScope.$new(), {
            data: {
              role: $scope.currentRole
            }
          })
        })
        .result.then(data => {
          var postdata = [];

          $.each(data, (idx, item) => {
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
            .result.then(result => {
              if ($scope.tableParams) {
                $scope.tableParams.reload();
              }
            });
        });
    };

    $scope.removeMember = user => {
      if (!$scope.currentRole) return;

      popupService.confirm('是否删除成员？').ok(() => {
        var postdata = [];

        if (user) {
          postdata.push(user.id);
        } else {
          $.each($scope.checked, (idx, item) => {
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
          .result.then(result => {
            if ($scope.tableParams) {
              $scope.tableParams.reload();
            }
          });
      });
    };

    $scope.$watch(
      () => {
        return $scope.currentRole;
      },
      val => {
        this.loadRoleDetails(val);
        this.loadRolePermissions(val);
      }
    );
  }
}

mod.controller(
  'SeedModules.Admin/modules/admin/controllers/roles',
  RolesController
);
