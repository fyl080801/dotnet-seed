define(['SeedModules.InPathTest/modules/module'], function(module) {
  'use strict';

  module.controller('SeedModules.InPathTest/modules/controllers/login', [
    '$scope',
    '$location',
    'SeedModules.AngularUI/modules/services/requestService',
    function($scope, $location, requestService) {
      $scope.data = {};

      $scope.login = function() {
        requestService
          .url('/api/account/login?ReturnUrl=' + $location.search().ReturnUrl)
          .post($scope.data)
          .result.then(function(result) {
            window.location = result.returnUrl;
          });
      };
    }
  ]);
});
