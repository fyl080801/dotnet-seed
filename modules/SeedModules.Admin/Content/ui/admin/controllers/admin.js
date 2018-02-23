define([
    'SeedModules.Admin/ui/admin/module'
], function (module) {
    'use strict';

    module.controller('SeedModules.Admin/ui/admin/controllers/admin', [
        '$scope',
        '$modal',
        '$window',
        'app.services.popupService',
        'SeedModules.AngularUI/ui/services/requestService',
        function ($scope, $modal, $window, popupService, requestService) {

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