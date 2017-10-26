define('seedmodules/setup', [
    'app/application'
], function (application) {
    'use strict';

    application.requires.push('seedmodules.setup');

    return angular
        .module('seedmodules.setup', [])
        .controller('seedmodules.setup', [
            '$scope',
            'app.services.popupService',
            function ($scope, popupService) {
                $scope.Name = 'aaa';
                $scope.install = function () {
                    popupService.information('哈哈哈');
                };
            }
        ]);
});