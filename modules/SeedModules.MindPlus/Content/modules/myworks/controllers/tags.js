define(['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/tags', [
        '$scope',
        '$stateParams',
        '$modal',
        'app/services/popupService',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/ngTableRequest',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, $stateParams, $modal, popupService, requestService, ngTableRequest, schemaFormParams) {
            $scope.list = [];
            var formParams = new schemaFormParams().properties({
                name: {
                    title: '名称',
                    type: 'string',
                    required: true
                },
                color: {
                    title: '颜色',
                    type: 'string',
                    required: true
                }
            });
            var form = [
                'name',
                {
                    key: 'color',
                    type: 'simplecolor'
                }
            ];
            $scope.load = function () {
                requestService
                    .url('/api/mindplus/tags/query')
                    .options({
                    showLoading: false
                })
                    .post({})
                    .result.then(function (result) {
                    $scope.list = result;
                });
            };
            $scope.create = function () {
                $modal
                    .open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    size: 'sm',
                    data: {
                        title: '新建标签',
                        formParams: formParams,
                        form: form,
                        model: {}
                    }
                })
                    .result.then(function (data) {
                    requestService
                        .url('/api/mindplus/tags')
                        .post($.extend(data, { mindWorkId: $stateParams.id }))
                        .result.then(function (result) {
                        $scope.load();
                    });
                });
            };
            $scope.edit = function (row) {
                $modal
                    .open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    size: 'sm',
                    data: {
                        title: '编辑标签',
                        formParams: formParams,
                        form: form,
                        model: $.extend({}, row)
                    }
                })
                    .result.then(function (data) {
                    requestService
                        .url('/api/mindplus/tags/' + row.id)
                        .put($.extend(data, { mindWorkId: $stateParams.id }))
                        .result.then(function (result) {
                        $scope.load();
                    });
                });
            };
            $scope.drop = function (row) {
                popupService.confirm('是否删除标签？').ok(function () {
                    requestService
                        .url('/api/mindplus/tags/' + row.id)
                        .drop()
                        .result.then(function (result) {
                        $scope.load();
                    });
                });
            };
        }
    ]);
});
//# sourceMappingURL=tags.js.map