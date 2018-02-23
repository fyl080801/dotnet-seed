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
        'SeedModules.Admin/ui/admin/configs/nav',
        'SeedModules.AngularUI/ui/services/requestService',
        function ($scope, $state, $modal, $window, popupService, nav, requestService) {
            $scope.sidebar = {};

            $scope.navData = nav.tree();

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