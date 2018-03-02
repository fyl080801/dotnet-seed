define(['SeedModules.InPathTest/ui/module'], function(module) {
  'use strict';

  module.controller('SeedModules.InPathTest/ui/controllers/login', [
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
