define(["require", "exports", "SeedModules.Admin/modules/admin/module", "angular", "jquery"], function (require, exports, mod, angular, $) {
    "use strict";
    exports.__esModule = true;
    var RolesController = (function () {
        function RolesController($scope, $rootScope, $modal, popupService, requestService, ngTableRequest, schemaFormParams) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$modal = $modal;
            this.popupService = popupService;
            this.requestService = requestService;
            this.ngTableRequest = ngTableRequest;
            this.schemaFormParams = schemaFormParams;
            $scope.vm = this;
            $scope.roles = [];
            $scope.currentRole = null;
            $scope.tableParams = null;
            $scope.tableRequest = new ngTableRequest({
                showLoading: false
            });
            $scope.checkedAll = false;
            $scope.checked = {};
            $scope.permissions = [];
            $scope.roleEnables = [];
            $scope.roleForm = new schemaFormParams().properties({
                rolename: {
                    title: '名称',
                    type: 'string',
                    required: true
                }
            });
            $scope.cancelEditing = function () {
                $scope.currentRole = null;
            };
            $scope.create = function () {
                $modal
                    .open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    size: 'sm',
                    scope: angular.extend($rootScope.$new(), {
                        $data: {
                            title: '新建角色',
                            formParams: $scope.roleForm,
                            form: ['rolename']
                        }
                    })
                })
                    .result.then(function (data) {
                    requestService
                        .url('/api/admin/roles')
                        .post(data)
                        .result.then(function (result) {
                        _this.loadRoles();
                    });
                });
            };
            $scope.drop = function () {
                popupService.confirm('是否删除角色？').ok(function () {
                    requestService
                        .url('/api/admin/roles/' + $scope.currentRole.id)
                        .drop()
                        .result.then(function (result) {
                        $scope.currentRole = null;
                        _this.loadRoles();
                    });
                });
            };
            $scope.setName = function (role) {
                $modal
                    .open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    size: 'sm',
                    scope: angular.extend(_this.$rootScope.$new(), {
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
                    .result.then(function (data) {
                    requestService
                        .url('/api/admin/roles/' +
                        role.id +
                        '/displayname?name=' +
                        (data.displayName || ''))
                        .patch()
                        .result.then(function (result) {
                        _this.loadRoles();
                    });
                });
            };
            $scope.addMember = function () {
                if (!$scope.currentRole)
                    return;
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
                    .result.then(function (data) {
                    var postdata = [];
                    $.each(data, function (idx, item) {
                        if (item) {
                            postdata.push(idx);
                        }
                    });
                    if (postdata.length <= 0)
                        return;
                    requestService
                        .url('/api/admin/roles/' + $scope.currentRole.id + '/members')
                        .post({
                        members: postdata
                    })
                        .result.then(function (result) {
                        if ($scope.tableParams) {
                            $scope.tableParams.reload();
                        }
                    });
                });
            };
            $scope.removeMember = function (user) {
                if (!$scope.currentRole)
                    return;
                popupService.confirm('是否删除成员？').ok(function () {
                    var postdata = [];
                    if (user) {
                        postdata.push(user.id);
                    }
                    else {
                        $.each($scope.checked, function (idx, item) {
                            if (item) {
                                postdata.push(idx);
                            }
                        });
                    }
                    if (postdata.length <= 0)
                        return;
                    requestService
                        .url('/api/admin/roles/' + $scope.currentRole.id + '/members')
                        .patch({
                        members: postdata
                    })
                        .result.then(function (result) {
                        if ($scope.tableParams) {
                            $scope.tableParams.reload();
                        }
                    });
                });
            };
            $scope.$watch(function () {
                return $scope.currentRole;
            }, function (val) {
                _this.loadRoleDetails(val);
                _this.loadRolePermissions(val);
            });
        }
        RolesController.prototype.checkAll = function () {
            var _this = this;
            this.$scope.checkedAll = !this.$scope.checkedAll;
            if (this.$scope.checkedAll) {
                angular.forEach(this.$scope.tableParams.data, function (item) {
                    _this.$scope.checked[item.id] = true;
                });
            }
            else {
                angular.forEach(this.$scope.tableParams.data, function (item) {
                    _this.$scope.checked[item.id] = false;
                });
            }
        };
        RolesController.prototype.onCheck = function () {
            var _this = this;
            this.$scope.checkedAll = true;
            angular.forEach(this.$scope.tableParams.data, function (item) {
                if (!_this.$scope.checked[item.id]) {
                    _this.$scope.checkedAll = false;
                    return false;
                }
            });
        };
        RolesController.prototype.loadRoles = function () {
            var _this = this;
            this.requestService
                .url('/api/admin/roles')
                .options({
                showLoading: false
            })
                .get()
                .result.then(function (result) {
                _this.$scope.roles = result;
            });
        };
        RolesController.prototype.selectRole = function (role) {
            this.$scope.currentRole = role;
        };
        RolesController.prototype.loadRoleDetails = function (role) {
            this.$scope.checkedAll = false;
            this.$scope.checked = {};
            if (!role)
                return;
            this.$scope.tableParams = this.$scope.tableRequest
                .options({
                url: '/api/admin/roles/' + role.id + '/members/query'
            })
                .ngTableParams();
        };
        RolesController.prototype.loadRolePermissions = function (role) {
            var _this = this;
            this.$scope.permissions = [];
            this.$scope.roleEnables = [];
            if (!role)
                return;
            this.requestService
                .url('/api/admin/roles/' + role.id + '/permission')
                .options({ showLoading: false })
                .get()
                .result.then(function (result) {
                _this.$scope.permissions = result.permissions;
                _this.$scope.roleEnables = result.enables;
            });
        };
        RolesController.prototype.hasPermission = function (per) {
            if (this.$scope.roleEnables) {
                return this.$scope.roleEnables.indexOf(per.name) >= 0;
            }
            else {
                return false;
            }
        };
        RolesController.prototype.permissionChanged = function (per) {
            var idx = this.$scope.roleEnables.indexOf(per.name);
            if (idx >= 0) {
                this.$scope.roleEnables.splice(idx, 1);
            }
            else {
                this.$scope.roleEnables.push(per.name);
            }
        };
        RolesController.prototype.isAllPermission = function (defd) {
            var pers = this.$scope.permissions[defd];
            for (var i = 0; i < pers.length; i++) {
                if (this.$scope.roleEnables.indexOf(pers[i].name) < 0) {
                    return false;
                }
            }
            return true;
        };
        RolesController.prototype.changeAllPermission = function (defd) {
            var isAll = this.isAllPermission(defd);
            var pers = this.$scope.permissions[defd];
            if (!isAll) {
                for (var i = 0; i < pers.length; i++) {
                    if (this.$scope.roleEnables.indexOf(pers[i].name) < 0) {
                        this.$scope.roleEnables.push(pers[i].name);
                    }
                }
            }
            else {
                for (var i = 0; i < pers.length; i++) {
                    var idx = this.$scope.roleEnables.indexOf(pers[i].name);
                    if (idx >= 0) {
                        this.$scope.roleEnables.splice(idx, 1);
                    }
                }
            }
        };
        RolesController.prototype.saveRolePermission = function () {
            var _this = this;
            if (!this.$scope.currentRole)
                return;
            this.requestService
                .url('/api/admin/roles/' + this.$scope.currentRole.id + '/permission')
                .put(this.$scope.roleEnables)
                .result.then(function () {
                _this.popupService.information('保存成功');
            });
        };
        RolesController.$inject = [
            '$scope',
            '$rootScope',
            '$modal',
            'app/services/popupService',
            'SeedModules.AngularUI/modules/services/requestService',
            'SeedModules.AngularUI/modules/factories/ngTableRequest',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return RolesController;
    }());
    mod.controller('SeedModules.Admin/modules/admin/controllers/roles', RolesController);
});
//# sourceMappingURL=roles.js.map