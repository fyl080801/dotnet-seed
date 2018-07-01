define(['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/workItems', [
        '$scope',
        '$stateParams',
        '$modal',
        '$appEnvironment',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/services/utility',
        function ($scope, $stateParams, $modal, $appEnvironment, requestService, utility) {
            $scope.list = [];
            $scope.finished = null;
            $scope.initWorkItem = function (item) {
                item.titleStyle = {
                    'padding-left': ((item.level || 1) - 1) * 30 + 'px'
                };
            };
            $scope.load = function () {
                requestService
                    .url('/api/mindplus/workitem/inwork/' +
                    $stateParams.id +
                    '?keyword=' +
                    ($scope.finished !== null ? '&finished=' + $scope.finished : ''))
                    .options({
                    showLoading: false
                })
                    .get()
                    .result.then(function (result) {
                    utility
                        .toTree(result)
                        .key('id')
                        .parentKey('parentId')
                        .onEach(function (idx, item) {
                        item.$$isExpand = true;
                    })
                        .then(function (tree) {
                        $scope.list = tree;
                    });
                });
            };
            $scope.create = function () {
                $modal
                    .open({
                    templateUrl: '/SeedModules.MindPlus/modules/myworks/views/workItem.html',
                    size: 'lg',
                    data: {
                        title: '新建任务',
                        model: {},
                        work: $appEnvironment.currentWork
                    }
                })
                    .result.then(function (data) {
                    requestService
                        .url('/api/mindplus/workitem')
                        .post(data)
                        .result.then(function (result) {
                        $scope.load();
                    });
                });
            };
        }
    ]);
});
//# sourceMappingURL=workItems.js.map