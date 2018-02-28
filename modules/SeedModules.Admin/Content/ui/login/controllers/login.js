define(['SeedModules.Admin/ui/login/module'], function(module) {
  'use strict';

  module.controller('SeedModules.Admin/ui/login/controllers/login', [
    '$scope',
    '$location',
    'SeedModules.AngularUI/ui/services/requestService',
    function($scope, $location, requestService) {
      $scope.data = {};

      $scope.login = function() {
        requestService
          .url('/api/account/login?ReturnUrl=' + $location.search().ReturnUrl)
          .post($scope.data)
          .then(function(result) {
            window.location = result.returnUrl;
          });
      };
    }
  ]);
});
