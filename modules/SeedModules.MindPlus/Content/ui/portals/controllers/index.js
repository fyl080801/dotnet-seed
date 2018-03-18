define(['SeedModules.MindPlus/ui/portals/module'], function(module) {
  'use strict';

  module.controller('SeedModules.MindPlus/ui/portals/controllers/index', [
    '$scope',
    '$appConfig',
    function($scope, $appConfig) {
      $scope.$appConfig = $appConfig;
    }
  ]);
});
