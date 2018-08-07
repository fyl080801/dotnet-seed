define('SeedModules.MindPlus/modules/mind/factories/minderInstance', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/mind/module',
    'angular',
    'kityminder'
], function (require, exports, mod, angular, kityminder) {
    'use strict';
    exports.__esModule = true;
    mod.factory('SeedModules.MindPlus/modules/mind/factories/minderInstance', [function () {
            var minderInit = function (options) {
                var minder = new kityminder.Minder({ renderTo: options.renderTo });
                for (var evt in options.events) {
                    minder.on(evt, options.events[evt] || angular.noop);
                }
                minder.on('normal.dblclick', function (e) {
                });
                minder.on('normal.mousedown', function (e) {
                    if (e.originEvent.button == 2) {
                    }
                });
                return minder;
            };
            return minderInit;
        }]);
});
define('SeedModules.MindPlus/modules/mind/controllers/editor', ['SeedModules.MindPlus/modules/mind/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/mind/controllers/editor', [
        '$scope',
        '$stateParams',
        '$appConfig',
        '$timeout',
        '$modal',
        'app/services/popupService',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.MindPlus/modules/mind/factories/minderInstance',
        function ($scope, $stateParams, $appConfig, $timeout, $modal, popupService, requestService, minderInstance) {
            $scope.$appConfig = $appConfig;
            $scope.mind = null;
            $scope.currentNode = null;
            $scope.minderInstance = new minderInstance({
                renderTo: '.mind-container',
                events: {
                    selectionchange: function (e) {
                        $scope.currentNode = e.minder.getSelectedNode();
                        $timeout(function () {
                            $scope.$apply();
                        });
                    }
                }
            });
            $scope.load = function () {
                requestService.url('/api/mindplus/works/' + $stateParams.id).options({ showLoading: false }).get().result.then(function (result) {
                    $scope.mind = result;
                    $scope.minderInstance.getRoot().setText(result.name);
                    $scope.minderInstance.refresh();
                });
            };
            $scope.addChild = function () {
                $scope.minderInstance.execCommand('AppendChildNode', '新建任务');
            };
            $scope.addParent = function () {
                $scope.minderInstance.execCommand('AppendParentNode', '新建任务');
            };
            $scope.addCurrent = function () {
                $scope.minderInstance.execCommand('AppendSiblingNode', '新建任务');
            };
            $scope.arrangeUp = function () {
                $scope.minderInstance.execCommand('ArrangeUp');
            };
            $scope.arrangeDown = function () {
                $scope.minderInstance.execCommand('ArrangeDown');
            };
            $scope.edit = function () {
                $scope.minderInstance.execCommand('EditNode');
            };
            $scope.drop = function () {
                $scope.minderInstance.execCommand('RemoveNode');
            };
        }
    ]);
});
define('SeedModules.MindPlus/modules/mind/requires', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/mind/factories/minderInstance',
    'SeedModules.MindPlus/modules/mind/controllers/editor'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
});