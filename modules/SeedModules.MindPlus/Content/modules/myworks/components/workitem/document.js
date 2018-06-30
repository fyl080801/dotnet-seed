define(["require", "exports", "SeedModules.MindPlus/modules/myworks/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var ControllerClass = (function () {
        function ControllerClass($scope, $timeout, popupService, utility, requestService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.popupService = popupService;
            this.utility = utility;
            this.requestService = requestService;
            $scope.worktree = [];
            $scope.editTitle = function (item) {
                item.$titleEditing = true;
            };
            $scope.$on('expandWorkItem', function (e, all) {
                utility
                    .eachTree($scope.worktree)
                    .children('children')
                    .onEach(function (item) {
                    item.showContent = all
                        ? true
                        : !item.children || item.children.length <= 0;
                });
            });
            $scope.$on('reduceWorkItem', function (e) {
                utility
                    .eachTree($scope.worktree)
                    .children('children')
                    .onEach(function (item) {
                    item.showContent = false;
                });
            });
            $scope.$watch(function () {
                return $scope.workitems;
            }, function (val) {
                utility
                    .toTree(val)
                    .key('id')
                    .parentKey('parentId')
                    .onEach(function (idx, item) {
                    item.$$isExpand = true;
                })
                    .then(function (tree) {
                    $scope.worktree = tree;
                });
            });
        }
        ControllerClass.$inject = [
            '$scope',
            '$timeout',
            'app/services/popupService',
            'SeedModules.AngularUI/modules/services/utility',
            'SeedModules.AngularUI/modules/services/requestService'
        ];
        return ControllerClass;
    }());
    mod.controller('SeedModules.MindPlus/modules/myworks/components/workitem/document', ControllerClass);
});

//# sourceMappingURL=document.js.map
