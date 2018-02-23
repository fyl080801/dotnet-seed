define([
    'SeedModules.Admin/ui/admin/module'
], function (module) {
    'use strict';

    module.controller('SeedModules.Admin/ui/admin/controllers/admin', [
        '$scope',
        '$state',
        '$modal',
        '$window',
        'app.services.popupService',
        'SeedModules.AngularUI/ui/services/requestService',
        function ($scope, $state, $modal, $window, popupService, requestService) {
            $scope.sidebar = {};

            $scope.navData = [{
                text: '系统管理',
                icon: 'fa fa-cog',
                children: [{
                    text: '用户管理',
                    itemClicked: function (evt) {
                        $state.go('admin.users');
                    }
                }, {
                    text: '角色管理',
                    itemClicked: function (evt) {
                        $state.go('admin.roles');
                    }
                }]
            }];

            $scope.logout = function () {
                popupService
                    .confirm('是否退出？')
                    .ok(function () {
                        requestService
                            .url('/api/account/logout')
                            .options({
                                dataOnly: true
                            })
                            .post()
                            .then(function () {
                                $window.location.reload();
                            });
                    });
            };

        }
    ]);
});