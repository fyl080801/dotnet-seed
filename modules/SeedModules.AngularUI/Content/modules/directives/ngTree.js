define(['SeedModules.AngularUI/modules/module'], function(module) {
  'use strict';

  module.directive('ngTree', [
    function() {
      return {
        restrict: 'EA',
        replace: true,
        template:
          '<ul class="tree-view"> <li ng-repeat="item in treeData" ng-include="itemTemplateUrl || \'/SeedModules.AngularUI/modules/views/treeItem.html\'" ></li> </ul>',
        scope: {
          treeData: '=',
          textField: '@',
          iconField: '@',
          childrenField: '@',
          itemTemplateUrl: '=',
          itemClicked: '&',
          itemExtending: '&'
        },
        controller: [
          '$scope',
          function($scope) {
            $scope.getItemText = function(item) {
              return $scope.textField ? item[$scope.textField] : item.text;
            };

            $scope.getItemIcon = function(item) {
              return $scope.iconField ? item[$scope.iconField] : item.icon;
            };

            $scope.getItemChildren = function(item) {
              var children = $scope.childrenField
                ? item[$scope.childrenField]
                : item.children;
              item.level = item.level ? item.level : 1;
              if (children) {
                for (var idx in children) {
                  children[idx].level = item.level + 1;
                }
              }
              return children;
            };

            $scope.getItemStyle = function(item) {
              return {
                'padding-left': (item.level || 1) * 15 + 'px'
              };
            };

            $scope.isLeaf = function(item) {
              var children = $scope.childrenField
                ? item[$scope.childrenField]
                : item.children;
              return !children;
            };

            $scope.itemExpended = function(item, $event) {
              item.$$isExpend = !item.$$isExpend;
              if (item.$$isExpend) {
                $scope.warpCallback('itemExtending', item, $event);
              }
              $event.stopPropagation();
            };

            $scope.warpCallback = function(callback, item, $event) {
              (item[callback] || $scope[callback] || angular.noop)({
                $item: item,
                $event: $event
              });
            };
          }
        ]
      };
    }
  ]);
});
