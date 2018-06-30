define(['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/works', [
        '$scope',
        '$modal',
        '$state',
        '$stateParams',
        '$appConfig',
        'app/services/popupService',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/ngTableRequest',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, $modal, $state, $stateParams, $appConfig, popupService, requestService, ngTableRequest, schemaFormParams) {
            $scope.$appConfig = $appConfig;
            $scope.tableParams = new ngTableRequest({
                url: '/api/mindplus/works/query?parent=' + $stateParams.parentid,
                showLoading: false
            }).ngTableParams();
            $scope.formParams = new schemaFormParams().properties({
                name: {
                    title: '名称',
                    type: 'string',
                    required: true
                },
                description: {
                    title: '描述',
                    type: 'string'
                }
            });
            $scope.form = [
                'name',
                {
                    key: 'description',
                    type: 'textarea',
                    placeholder: '描述信息'
                }
            ];
            $scope.create = function () {
                $modal
                    .open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    data: {
                        title: '新建项目',
                        formParams: $scope.formParams,
                        form: $scope.form,
                        model: {}
                    }
                })
                    .result.then(function (data) {
                    data.parentId = $stateParams.parentid;
                    requestService
                        .url('/api/mindplus/works')
                        .post(data)
                        .result.then(function (result) {
                        $scope.tableParams.reload();
                    });
                });
            };
            $scope.addfolder = function () {
                $modal
                    .open({
                    templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                    data: {
                        title: '新建文件夹',
                        formParams: $scope.formParams,
                        form: ['name'],
                        model: {}
                    }
                })
                    .result.then(function (data) {
                    data.isFolder = true;
                    data.parentId = $stateParams.parentid;
                    requestService
                        .url('/api/mindplus/works')
                        .post(data)
                        .result.then(function (result) {
                        $scope.tableParams.reload();
                    });
                });
            };
            $scope.back = function () {
                requestService
                    .url('/api/mindplus/works/' + $stateParams.parentid)
                    .options({
                    showLoading: false
                })
                    .get()
                    .result.then(function (result) {
                    $state.go('home.works', { parentid: result.parentId });
                });
            };
        }
    ]);
});

//# sourceMappingURL=works.js.map
