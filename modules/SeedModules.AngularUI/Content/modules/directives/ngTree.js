define(['SeedModules.AngularUI/modules/module'], function(module) {
  'use strict';

  module.directive('ngTree', [
    function() {
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: function(element, attrs) {
          if (attrs.itemRootTemplateUrl && attrs.itemRootTemplateUrl !== '') {
            var fn = Function;
            return new fn('return ' + attrs.itemRootTemplateUrl + ';')();
          } else {
            return '/SeedModules.AngularUI/modules/templates/ngTreeRoot.html';
          }
        },
        // template:
        //   '<div ng-include="itemRootTemplateUrl || \'/SeedModules.AngularUI/modules/templates/ngTreeRoot.html\'"> </div>',
        scope: {
          treeData: '=',
          textField: '@',
          iconField: '@',
          childrenField: '@',
          itemRootTemplateUrl: '=',
          itemTemplateUrl: '=',
          itemClicked: '&',
          itemExpanding: '&',
          itemInit: '&',
          singleExpand: '='
        },
        controller: [
          '$scope',
          '$state',
          'SeedModules.AngularUI/modules/services/utility',
          function($scope, $state, utility) {
            $scope.$state = $state;

            $scope.getItemText = function(item) {
              return $scope.textField ? item[$scope.textField] : item.text;
            };

            $scope.getItemIcon = function(item) {
              return $scope.iconField ? item[$scope.iconField] : item.icon;
            };

            $scope.getItemChildren = function(item) {
              return $scope.childrenField
                ? item[$scope.childrenField]
                : item.children;
            };

            // $scope.getItemStyle = function(item) {
            //   return {
            //     'padding-left': (item.level || 1) * 15 + 'px'
            //   };
            // };

            $scope.itemInited = function(item, $event) {
              // var children = $scope.getItemChildren(item);
              // if (children) {
              //   for (var idx in children) {
              //     children[idx].$parent = item;
              //   }
              // }
              // item.level = getLevel(item, 1);
              $scope.warpCallback('itemInit', item, $event);
            };

            $scope.isLeaf = function(item) {
              var children = $scope.childrenField
                ? item[$scope.childrenField]
                : item.children;
              return !children;
            };

            $scope.itemExpanded = function(item, $event) {
              utility
                .eachTree($scope.treeData)
                .children(
                  $scope.childrenField ? $scope.childrenField : 'children'
                )
                .onEach(function(child) {
                  if (child.$$hashKey !== item.$$hashKey) {
                    child.$$isExpand = !$scope.signalExpand
                      ? false
                      : child.$$isExpand;
                  }
                })
                .then(function() {
                  item.$$isExpand = !item.$$isExpand;
                  if (item.$$isExpand) {
                    $scope.warpCallback('itemExpanding', item, $event);
                  }
                });

              $event.stopPropagation();
            };

            $scope.warpCallback = function(callback, item, $event) {
              (item[callback] || $scope[callback] || angular.noop)({
                $item: item,
                $event: $event
              });
            };

            // function getLevel(item, level) {
            //   if (item.$parent) {
            //     return getLevel(item.$parent, level + 1);
            //   }
            //   return level;
            // }
          }
        ]
      };
    }
  ]);
});
