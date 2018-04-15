define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/components/workitem/document',
    [
      '$scope',
      '$timeout',
      'SeedModules.AngularUI/modules/services/utility',
      'SeedModules.AngularUI/modules/services/requestService',
      function($scope, $timeout, utility, requestService) {
        $scope.worktree = [];

        $scope.initWorkItem = function(item) {
          var level = 1;

          item.flagStyle = {
            'margin-left': ((item.level || 1) - 1) * 30 + 'px'
          };
          item.customStyle = {
            'padding-left': ((item.level || 1) - 1) * 30 + 'px'
          };
          item.contentShow = false;

          item.levelUp = function(cur) {
            if (cur.$parent) {
              if (!cur.$parent.$parent) {
                setItemLevelUp($scope.worktree, cur);
              } else {
                setItemLevelUp(cur.$parent.$parent.children, cur);
              }
            }
          };

          item.levelDown = function(cur) {
            if (!cur.$parent) {
              setItemLevelDown($scope.worktree, cur);
            } else {
              setItemLevelDown(cur.$parent.children, cur);
            }
          };
        };

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

        function setItemLevelDown(arr, item) {
          var preIndex = -1;
          var itemIndex = -1;

          for (var i in arr) {
            if (item.id === arr[i].id) {
              itemIndex = i;
              preIndex = i - 1;
              break;
            }
          }

          if (preIndex >= 0 && itemIndex >= 0) {
            requestService
              .url(
                '/api/mindplus/workitem/' +
                  item.id +
                  '/parent?parentId=' +
                  arr[preIndex].id
              )
              .patch()
              .then(function() {
                arr[preIndex].children = arr[preIndex].children || [];
                arr.splice(itemIndex, 1);
                item.$parent = arr[preIndex];
                item.parentId = item.$parent.id;
                arr[preIndex].children.push(item);
              });
          }
        }

        function setItemLevelUp(arr, item) {
          var itemIndex = -1;
          var parentIndex = -1;

          for (var i in item.$parent.children) {
            if (item.id === item.$parent.children[i].id) {
              itemIndex = i;
              break;
            }
          }

          for (var i in arr) {
            if (item.$parent.id === arr[i].id) {
              parentIndex = i;
              break;
            }
          }

          if (itemIndex >= 0) {
            requestService
              .url(
                '/api/mindplus/workitem/' +
                  item.id +
                  '/parent?parentId=' +
                  (item.$parent.$parent ? item.$parent.$parent.id : '')
              )
              .patch()
              .then(function() {
                item.$parent.children.splice(itemIndex, 1);
                item.parentId = item.$parent.$parent
                  ? item.$parent.$parent.id
                  : null;
                item.$parent = item.$parent.$parent;
                arr.splice(parentIndex + 1, 0, item);
              });
          }
        }
      }
    ]
  );
});
