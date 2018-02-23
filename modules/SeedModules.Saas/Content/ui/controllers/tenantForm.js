define([
    'SeedModules.Saas/ui/module'
], function (module) {
    'use strict';

    module.controller('SeedModules.Saas/ui/controllers/tenantForm', [
        '$scope',
        function ($scope) {
            $scope.databaseProviders = [{
                Provider: 'SqlConnection',
                Name: 'Microsoft SQLServer'
            }, {
                Provider: 'MySql',
                Name: 'MySql Database'
            }];
        }
    ]);
});