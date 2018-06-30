define(['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.controller('SeedModules.MindPlus/modules/myworks/controllers/workItem', [
        '$scope',
        'SeedModules.AngularUI/modules/services/requestService',
        'SeedModules.AngularUI/modules/factories/schemaFormParams',
        function ($scope, requestService, schemaFormParams) {
            $scope.formParams = new schemaFormParams().properties({
                title: {
                    title: '任务名称',
                    type: 'string',
                    required: true
                }
            });
            $scope.formFields = [
                {
                    key: 'title',
                    placeholder: '输入任务名称'
                }
            ];
            $scope.works = [];
            $scope.queryCities = [
                { value: 1, text: 'Amsterdam', continent: 'Europe' },
                { value: 4, text: 'Washington', continent: 'America' },
                { value: 7, text: 'Sydney', continent: 'Australia' },
                { value: 10, text: 'Beijing', continent: 'Asia' },
                { value: 13, text: 'Cairo', continent: 'Africa' }
            ];
            $scope.loadWorks = function (item) {
                if (item && item.children && item.children.length > 0)
                    return;
                if (!item && $scope.works.length > 0)
                    return;
                requestService
                    .url('/api/mindplus/works/tree?parent=' + (item ? item.id : ''))
                    .options({
                    showLoading: false
                })
                    .get()
                    .result.then(function (result) {
                    for (var idx in result) {
                        result[idx].children = result[idx].isFolder ? [] : null;
                    }
                    if (item) {
                        item.children = result;
                    }
                    else {
                        $scope.works = result;
                    }
                });
            };
            $scope.workSelected = function (item) {
                $scope.$data.work = item;
            };
            $scope.submit = function () {
                $scope.$data.model.mindWorkId = $scope.$data.work.id;
                $scope.$close($scope.$data.model);
            };
        }
    ]);
});

//# sourceMappingURL=workItem.js.map
