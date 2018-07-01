define(["require", "exports", "SeedModules.PageBuilder/modules/module", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes"], function (require, exports, mod, defaultFormTypes_1) {
    "use strict";
    exports.__esModule = true;
    var ControllerClass = (function () {
        function ControllerClass($scope, $state, $modal, popupService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
            $scope.vm = this;
            $scope.sfForm = {
                form: [
                    {
                        type: defaultFormTypes_1.DefaultFormTypes.section,
                        htmlClass: 'row',
                        items: [
                            {
                                type: defaultFormTypes_1.DefaultFormTypes.section,
                                htmlClass: 'col-md-6',
                                items: ['name']
                            },
                            {
                                type: defaultFormTypes_1.DefaultFormTypes.section,
                                htmlClass: 'col-md-6',
                                items: [
                                    {
                                        key: 'sourceType',
                                        type: defaultFormTypes_1.DefaultFormTypes.select
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: defaultFormTypes_1.DefaultFormTypes.textarea,
                        key: 'description'
                    }
                ],
                model: {},
                options: {},
                schema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', title: '名称', required: true },
                        description: { type: 'string', title: '描述' },
                        sourceType: { type: 'string', title: '类型', required: true }
                    }
                }
            };
        }
        ControllerClass.$inject = ['$scope', '$state', '$modal', 'app/services/popupService'];
        return ControllerClass;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/datasource/baseinfo', ControllerClass);
});
//# sourceMappingURL=baseinfo.js.map