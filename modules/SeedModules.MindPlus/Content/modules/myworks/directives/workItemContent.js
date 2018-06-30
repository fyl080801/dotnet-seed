define(['SeedModules.MindPlus/modules/myworks/module'], function (module) {
    'use strict';
    module.directive('workItemContent', [
        'SeedModules.AngularUI/modules/services/requestService',
        function (requestService) {
            return {
                restrict: 'EA',
                replace: true,
                templateUrl: '/SeedModules.MindPlus/modules/myworks/templates/workItemContent.html',
                scope: {
                    workItem: '=workItemContent'
                },
                link: function (scope, element, attrs, ctl) {
                    scope.status = 'loading';
                    scope.load = function () {
                        requestService
                            .url('/api/mindplus/workitem/' + scope.workItem.id + '/content')
                            .options({ showLoading: false })
                            .get()
                            .result.then(function (result) {
                            if (result.content && result.content !== '') {
                                scope.status = 'show';
                            }
                            else {
                                scope.status = 'new';
                            }
                        });
                    };
                    scope.editContent = function () {
                        scope.status = 'editing';
                    };
                    scope.$on('spyscrolled', function (evt) { });
                }
            };
        }
    ]);
});

//# sourceMappingURL=workItemContent.js.map
