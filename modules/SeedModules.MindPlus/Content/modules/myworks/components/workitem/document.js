define(['SeedModules.MindPlus/modules/myworks/module'], function(module) {
  'use strict';

  module.controller(
    'SeedModules.MindPlus/modules/myworks/components/workitem/document',
    [
      '$scope',
      '$timeout',
      'app/services/popupService',
      'SeedModules.AngularUI/modules/services/utility',
      'SeedModules.AngularUI/modules/services/requestService',
      function($scope, $timeout, popupService, utility, requestService) {
        // $($('head')[0]).append(
        //   $(
        //     '<script src="/SeedModules.MindPlus/js/parser_rules/advanced_and_extended.js"></script>'
        //   )
        // );
        // $($('head')[0]).append(
        //   $(
        //     '<script src="/SeedModules.MindPlus/js/wysihtml/rangy-core.js"></script>'
        //   )
        // );
        // $($('head')[0]).append(
        //   $(
        //     '<script src="/SeedModules.MindPlus/js/wysihtml/wysihtml-toolbar.min.js"></script>'
        //   )
        // );

        $scope.worktree = [];

        $scope.initWorkItem = function(item) {
          item.contentShow = false;

          item.editWorkItemContent = function(target) {
            console.log(target);
          };

          item.endEdit = function(target) {
            target.$item.$titleEditing = false;
            requestService
              .url(
                '/api/mindplus/workitem/' +
                  target.$item.id +
                  '/title?title=' +
                  target.$item.title
              )
              .options({ showLoading: false })
              .patch()
              .then(function() {});
          };

          item.titleKeyDown = function(target) {
            if (target.$event.keyCode === 13) {
              item.endEdit(target);
            }
          };

          item.deleteWorkItem = function(target) {
            popupService.confirm('是否删除？').ok(function() {});
          };

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

        $scope.editTitle = function(item) {
          item.$titleEditing = true;
        };

        $scope.$on('expandWorkItem', function(e, all) {
          utility
            .eachTree($scope.worktree)
            .children('children')
            .onEach(function(item) {
              item.showContent = all
                ? true
                : !item.children || item.children.length <= 0;
            });
        });

        $scope.$on('reduceWorkItem', function(e) {
          utility
            .eachTree($scope.worktree)
            .children('children')
            .onEach(function(item) {
              item.showContent = false;
            });
        });

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
                item.$$isExpand = true;
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
              .options({ showLoading: false })
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
          var afters = [];
          var afterlength = 0;

          for (var i in item.$parent.children) {
            if (item.id === item.$parent.children[i].id) {
              itemIndex = parseInt(i);
              for (
                var j = itemIndex + 1;
                j < item.$parent.children.length;
                j++
              ) {
                afterlength++;
                afters.push(item.$parent.children[j]);
              }
              break;
            }
          }

          for (var m in arr) {
            if (item.$parent.id === arr[m].id) {
              parentIndex = m;
              break;
            }
          }

          if (itemIndex >= 0) {
            var changes = [
              {
                id: item.id,
                parentId: item.$parent.$parent ? item.$parent.$parent.id : null
              }
            ];
            for (var k in afters) {
              changes.push({
                id: afters[k].id,
                parentId: item.id
              });
            }
            requestService
              .url('/api/mindplus/workitem/parents')
              .options({ showLoading: false })
              .patch(changes)
              .then(function() {
                if (afters.length > 0) {
                  item.children = item.children || [];
                  for (var i in afters) {
                    afters[i].$parent = item;
                    item.children.push(afters[i]);
                  }
                  item.$parent.children.splice(itemIndex + 1, afterlength);
                }

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
