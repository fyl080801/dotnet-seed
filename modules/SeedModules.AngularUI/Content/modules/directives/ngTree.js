define(['SeedModules.AngularUI/modules/module'], function (module) {
    'use strict';
    module.directive('ngTree', [
        function () {
            return {
                restrict: 'EA',
                replace: true,
                templateUrl: function (element, attrs) {
                    if (attrs.rootTemplateUrl && attrs.rootTemplateUrl !== '') {
                        var fn = Function;
                        return new fn('return ' + attrs.rootTemplateUrl + ';')();
                    }
                    else {
                        return '/SeedModules.AngularUI/modules/templates/ngTreeRoot.html';
                    }
                },
                scope: {
                    treeData: '=',
                    textField: '@',
                    iconField: '@',
                    childrenField: '@',
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
                    function ($scope, $state, utility) {
                        $scope.$state = $state;
                        $scope.getItemText = function (item) {
                            return $scope.textField ? item[$scope.textField] : item.text;
                        };
                        $scope.getItemIcon = function (item) {
                            return $scope.iconField ? item[$scope.iconField] : item.icon;
                        };
                        $scope.getItemChildren = function (item) {
                            return $scope.childrenField
                                ? item[$scope.childrenField]
                                : item.children;
                        };
                        $scope.itemInited = function (item, $event) {
                            $scope.warpCallback('itemInit', item, $event);
                        };
                        $scope.isLeaf = function (item) {
                            var children = $scope.childrenField
                                ? item[$scope.childrenField]
                                : item.children;
                            return !children;
                        };
                        $scope.itemExpanded = function (item, $event) {
                            utility
                                .eachTree($scope.treeData)
                                .children($scope.childrenField ? $scope.childrenField : 'children')
                                .onEach(function (child) {
                                if (child.$$hashKey !== item.$$hashKey) {
                                    child.$$isExpand = !$scope.signalExpand
                                        ? false
                                        : child.$$isExpand;
                                }
                            })
                                .then(function () {
                                item.$$isExpand = !item.$$isExpand;
                                if (item.$$isExpand) {
                                    $scope.warpCallback('itemExpanding', item, $event);
                                }
                            });
                            $event.stopPropagation();
                        };
                        $scope.warpCallback = function (callback, item, $event) {
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

//# sourceMappingURL=ngTree.js.map
