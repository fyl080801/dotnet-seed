define('SeedModules.Admin/modules/admin/directives/sidebar', [
    'require',
    'exports',
    'SeedModules.Admin/modules/admin/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var SidebarController = function () {
        function SidebarController($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;
            $element = $($element);
            $scope.toggle = function () {
                var navItemShow = $element.find('.sidebar-item.sidebar-show');
                var navItem = $element.find('.sidebar-item');
                var navContent = $('.sidebar-content');
                if (!$element.hasClass('sidebar-mini')) {
                    navItemShow.removeClass('sidebar-show');
                    navItem.children('ul').removeAttr('style');
                    $element.addClass('sidebar-mini');
                    navContent.addClass('sidebar-mini');
                } else {
                    $element.removeClass('sidebar-mini');
                    navContent.removeClass('sidebar-mini');
                }
            };
            $scope.sidebar = $.extend($scope.sidebar, { toggle: $scope.toggle });
        }
        SidebarController.$inject = [
            '$scope',
            '$element'
        ];
        return SidebarController;
    }();
    function directive() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="sidebar"><div class="sidebar-top"><a href="" ng-click="toggle()"><i class="fas fa-bars fa-fw"></i></a></div><ul sidebar-nav nav-data="navData"></ul></div>',
            scope: {
                sidebar: '=',
                navData: '='
            },
            controller: SidebarController
        };
    }
    mod.directive('sidebar', directive);
});
define('SeedModules.Admin/modules/admin/directives/sidebarNav', [
    'require',
    'exports',
    'SeedModules.Admin/modules/admin/module',
    'angular'
], function (require, exports, mod, angular) {
    'use strict';
    exports.__esModule = true;
    var SidebarNavController = function () {
        function SidebarNavController($scope, $element, $timeout) {
            this.$scope = $scope;
            this.$element = $element;
            this.$timeout = $timeout;
            $element = $($element);
            $scope.isLeaf = function (item) {
                return !item.children || item.children.length <= 0;
            };
            $scope.warpClick = function (item, $event) {
                if (!$scope.isLeaf(item)) {
                    var sidebar = $element.parent('.sidebar');
                    var node = $($event.currentTarget);
                    var navItemShow = sidebar.find('.sidebar-item.sidebar-show');
                    var navItem = sidebar.find('.sidebar-item');
                    if (!sidebar.hasClass('sidebar-mini')) {
                        if (node.next().css('display') == 'none') {
                            navItem.children('ul').slideUp(300);
                            node.next('ul').slideDown(300);
                            node.parent('li').addClass('sidebar-show').siblings('li').removeClass('sidebar-show');
                        } else {
                            node.next('ul').slideUp(300);
                            navItemShow.removeClass('sidebar-show');
                        }
                    }
                } else {
                    (item.itemClicked ? item.itemClicked : angular.noop)({
                        $item: item,
                        $event: $event
                    });
                }
            };
        }
        SidebarNavController.$inject = [
            '$scope',
            '$element',
            '$timeout'
        ];
        return SidebarNavController;
    }();
    function directive() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<ul><li class="sidebar-item" ng-repeat="item in navData" ng-include="\'/SeedModules.Admin/modules/admin/templates/navItem.html\'"></li></ul>',
            scope: { navData: '=' },
            controller: SidebarNavController
        };
    }
    mod.directive('sidebarNav', directive);
});
define('SeedModules.Admin/modules/admin/controllers/admin', [
    'require',
    'exports',
    'SeedModules.Admin/modules/admin/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    mod.controller('SeedModules.Admin/modules/admin/controllers/admin', [
        '$scope',
        '$state',
        '$modal',
        '$window',
        'app/services/popupService',
        'SeedModules.Admin/modules/admin/configs/nav',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, $state, $modal, $window, popupService, nav, requestService, schemaFormParams) {
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
                    validationMessage: { compare: '密码不一致' },
                    compare: function (modelValue, model, form) {
                        return modelValue === model.password;
                    }
                }
            ];
            $scope.sidebar = {};
            $scope.navData = nav.tree();
            $scope.logout = function () {
                popupService.confirm('是否退出\uFF1F').ok(function () {
                    requestService.url('/api/account/logout').options({ dataOnly: true }).post().result.then(function () {
                        $window.location.reload();
                    });
                });
            };
            $scope.changePassword = function () {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    size: 'sm',
                    data: {
                        title: '修改密码',
                        formParams: $scope.passwordFormParams,
                        form: $scope.passwordForm,
                        model: {}
                    }
                }).result.then(function (data) {
                    requestService.url('/api/admin/users/password').patch(data).result.then(function () {
                        popupService.information('修改成功');
                    });
                });
            };
        }
    ]);
});
define('SeedModules.Admin/modules/admin/controllers/dashboard', [
    'require',
    'exports',
    'SeedModules.Admin/modules/admin/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    mod.controller('SeedModules.Admin/modules/admin/controllers/dashboard', [
        '$scope',
        function ($scope) {
        }
    ]);
});
define('SeedModules.Admin/modules/admin/controllers/users', ['SeedModules.Admin/modules/admin/module'], function (module) {
    'use strict';
    module.controller('SeedModules.Admin/modules/admin/controllers/users', [
        '$scope',
        '$modal',
        '$q',
        '$timeout',
        'app/services/popupService',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/ngTableRequest',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, $modal, $q, $timeout, popupService, requestService, ngTableRequest, schemaFormParams) {
            $scope.search = { keyword: '' };
            $scope.tableParams = new ngTableRequest({
                url: '/api/admin/users/query',
                showLoading: false,
                data: $scope.search
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
                            items: [{
                                    key: 'password',
                                    type: 'password'
                                }]
                        },
                        {
                            type: 'section',
                            htmlClass: 'col-xs-6',
                            items: [{
                                    key: 'confirmPassword',
                                    type: 'password',
                                    validationMessage: { compare: '密码不一致' },
                                    compare: function (modelValue, model, form) {
                                        return modelValue === model.password;
                                    }
                                }]
                        }
                    ]
                }
            ];
            $scope.keywordCallback = function () {
            };
            $scope.create = function () {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    data: {
                        title: '新建用户',
                        formParams: $scope.formParams,
                        form: $scope.form
                    }
                }).result.then(function (data) {
                    requestService.url('/api/admin/users').post(data).result.then(function (result) {
                        $scope.tableParams.reload();
                    });
                });
            };
            $scope.resetPassword = function (row) {
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
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
                        form: [{
                                key: 'password',
                                type: 'password'
                            }],
                        model: {}
                    }
                }).result.then(function (data) {
                    requestService.url('/api/admin/users/password/' + row.id).patch(data).result.then(function (result) {
                        popupService.information('重置成功');
                    });
                });
            };
            $scope.drop = function (row) {
                popupService.confirm('是否删除用户\uFF1F').ok(function () {
                    requestService.url('/api/admin/users/' + row.id).drop().result.then(function (result) {
                        $scope.tableParams.reload();
                    });
                });
            };
        }
    ]);
});
define('SeedModules.Admin/modules/admin/controllers/roles', [
    'require',
    'exports',
    'SeedModules.Admin/modules/admin/module',
    'angular',
    'jquery'
], function (require, exports, mod, angular, $) {
    'use strict';
    exports.__esModule = true;
    var RolesController = function () {
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
            $scope.tableRequest = new ngTableRequest({ showLoading: false });
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
                $modal.open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    size: 'sm',
                    scope: angular.extend($rootScope.$new(), {
                        $data: {
                            title: '新建角色',
                            formParams: $scope.roleForm,
                            form: ['rolename']
                        }
                    })
                }).result.then(function (data) {
                    requestService.url('/api/admin/roles').post(data).result.then(function (result) {
                        _this.loadRoles();
                    });
                });
            };
            $scope.drop = function () {
                popupService.confirm('是否删除角色\uFF1F').ok(function () {
                    requestService.url('/api/admin/roles/' + $scope.currentRole.id).drop().result.then(function (result) {
                        $scope.currentRole = null;
                        _this.loadRoles();
                    });
                });
            };
            $scope.setName = function (role) {
                $modal.open({
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
                }).result.then(function (data) {
                    requestService.url('/api/admin/roles/' + role.id + '/displayname?name=' + (data.displayName || '')).patch().result.then(function (result) {
                        _this.loadRoles();
                    });
                });
            };
            $scope.addMember = function () {
                if (!$scope.currentRole)
                    return;
                $modal.open({
                    templateUrl: '/SeedModules.Admin/modules/admin/views/members.html',
                    size: 'lg',
                    scope: angular.extend($rootScope.$new(), { data: { role: $scope.currentRole } })
                }).result.then(function (data) {
                    var postdata = [];
                    $.each(data, function (idx, item) {
                        if (item) {
                            postdata.push(idx);
                        }
                    });
                    if (postdata.length <= 0)
                        return;
                    requestService.url('/api/admin/roles/' + $scope.currentRole.id + '/members').post({ members: postdata }).result.then(function (result) {
                        if ($scope.tableParams) {
                            $scope.tableParams.reload();
                        }
                    });
                });
            };
            $scope.removeMember = function (user) {
                if (!$scope.currentRole)
                    return;
                popupService.confirm('是否删除成员\uFF1F').ok(function () {
                    var postdata = [];
                    if (user) {
                        postdata.push(user.id);
                    } else {
                        $.each($scope.checked, function (idx, item) {
                            if (item) {
                                postdata.push(idx);
                            }
                        });
                    }
                    if (postdata.length <= 0)
                        return;
                    requestService.url('/api/admin/roles/' + $scope.currentRole.id + '/members').patch({ members: postdata }).result.then(function (result) {
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
            } else {
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
            this.requestService.url('/api/admin/roles').options({ showLoading: false }).get().result.then(function (result) {
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
            this.$scope.tableParams = this.$scope.tableRequest.options({ url: '/api/admin/roles/' + role.id + '/members/query' }).ngTableParams();
        };
        RolesController.prototype.loadRolePermissions = function (role) {
            var _this = this;
            this.$scope.permissions = [];
            this.$scope.roleEnables = [];
            if (!role)
                return;
            this.requestService.url('/api/admin/roles/' + role.id + '/permission').options({ showLoading: false }).get().result.then(function (result) {
                _this.$scope.permissions = result.permissions;
                _this.$scope.roleEnables = result.enables;
            });
        };
        RolesController.prototype.hasPermission = function (per) {
            if (this.$scope.roleEnables) {
                return this.$scope.roleEnables.indexOf(per.name) >= 0;
            } else {
                return false;
            }
        };
        RolesController.prototype.permissionChanged = function (per) {
            var idx = this.$scope.roleEnables.indexOf(per.name);
            if (idx >= 0) {
                this.$scope.roleEnables.splice(idx, 1);
            } else {
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
            } else {
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
            this.requestService.url('/api/admin/roles/' + this.$scope.currentRole.id + '/permission').put(this.$scope.roleEnables).result.then(function () {
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
    }();
    mod.controller('SeedModules.Admin/modules/admin/controllers/roles', RolesController);
});
define('SeedModules.Admin/modules/admin/controllers/members', [
    'require',
    'exports',
    'SeedModules.Admin/modules/admin/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    mod.controller('SeedModules.Admin/modules/admin/controllers/members', [
        '$scope',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/ngTableRequest',
        function ($scope, requestService, ngTableRequest) {
            $scope.tableParams = new ngTableRequest({
                url: '/api/admin/roles/' + $scope.$data.role.id + '/notmembers/query',
                showLoading: false
            }).ngTableParams({ count: 30 }, { counts: [] });
            $scope.selected = {};
            $scope.onCheck = function (user) {
                $scope.selected[user.id] = !$scope.selected[user.id];
            };
        }
    ]);
});
define('SeedModules.Admin/modules/admin/controllers/settings', [
    'require',
    'exports',
    'SeedModules.Admin/modules/admin/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var SettingsController = function () {
        function SettingsController($scope, schemaFormParams) {
            this.$scope = $scope;
            this.schemaFormParams = schemaFormParams;
            $scope.formParams = new schemaFormParams();
            $scope.form = [];
        }
        SettingsController.$inject = [
            '$scope',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return SettingsController;
    }();
    mod.controller('SeedModules.Admin/modules/admin/controllers/settings', SettingsController);
});
define('SeedModules.Admin/modules/admin/requires', [
    'require',
    'exports',
    'SeedModules.Admin/modules/admin/directives/sidebar',
    'SeedModules.Admin/modules/admin/directives/sidebarNav',
    'SeedModules.Admin/modules/admin/controllers/admin',
    'SeedModules.Admin/modules/admin/controllers/dashboard',
    'SeedModules.Admin/modules/admin/controllers/users',
    'SeedModules.Admin/modules/admin/controllers/roles',
    'SeedModules.Admin/modules/admin/controllers/members',
    'SeedModules.Admin/modules/admin/controllers/settings'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
});