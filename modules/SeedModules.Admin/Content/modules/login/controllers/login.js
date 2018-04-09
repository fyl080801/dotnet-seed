define(['SeedModules.Admin/modules/login/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/modules/login/controllers/login', [
    '$scope',
    '$location',
    'SeedModules.AngularUI/modules/services/requestService',
    function($scope, $location, requestService) {
      $scope.data = {};

      $scope.login = function() {
        requestService
          .url('/api/account/login?ReturnUrl=' + $location.search().ReturnUrl)
          .post($scope.data)
          .then(function(result) {
            if (result.success) {
              window.location = result.returnUrl;
            }
          });
      };
    }
  ]);
});
