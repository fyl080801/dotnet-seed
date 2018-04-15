define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/components/workitem/document',
    [
      '$scope',
      'SeedModules.AngularUI/modules/services/utility',
      function($scope, utility) {
        $scope.worktree = [];

        $scope.$watch(
          function() {
            return $scope.workitems;
          },
          function(val) {
            utility
              .toTree(val)
              .key('id')
              .parentKey('parentId')
              .onEach(function(idx, item) {
                item.$$isExpend = true;
              })
              .then(function(tree) {
                $scope.worktree = tree;
              });
          }
        );
      }
    ]
  );
});
