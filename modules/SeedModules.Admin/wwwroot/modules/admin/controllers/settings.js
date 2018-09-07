define(["require", "exports", "SeedModules.Admin/modules/admin/module", "SeedModules.AngularUI/modules/configs/enums/defaultFormTypes"], function (require, exports, mod, defaultFormTypes_1) {
    "use strict";
    exports.__esModule = true;
    var SettingsController = (function () {
        function SettingsController($scope, popupService, requestService, schemaFormParams) {
            this.$scope = $scope;
            this.popupService = popupService;
            this.requestService = requestService;
            this.schemaFormParams = schemaFormParams;
            $scope.vm = this;
            $scope.formParams = new schemaFormParams().properties({
                siteName: {
                    title: '站点名称',
                    type: 'string',
                    required: true
                },
                homeRoute: {
                    type: 'object',
                    properties: {
                        Area: {
                            title: '模块',
                            type: 'string'
                        },
                        Controller: {
                            title: '控制器',
                            type: 'string'
                        },
                        Action: {
                            title: '路径',
                            type: 'string'
                        }
                    }
                }
            });
            $scope.form = [
                'siteName',
                {
                    type: defaultFormTypes_1.DefaultFormTypes.section,
                    htmlClass: 'row',
                    items: [
                        {
                            type: defaultFormTypes_1.DefaultFormTypes.section,
                            htmlClass: 'col-md-4',
                            items: ['homeRoute.Area']
                        },
                        {
                            type: defaultFormTypes_1.DefaultFormTypes.section,
                            htmlClass: 'col-md-4',
                            items: ['homeRoute.Controller']
                        },
                        {
                            type: defaultFormTypes_1.DefaultFormTypes.section,
                            htmlClass: 'col-md-4',
                            items: ['homeRoute.Action']
                        }
                    ]
                }
            ];
            $scope.model = {};
            requestService
                .url('/api/settings')
                .get()
                .result.then(function (result) {
                $scope.model = result;
            });
        }
        SettingsController.prototype.save = function () {
            var _this = this;
            this.requestService
                .url('/api/settings')
                .patch(this.$scope.model)
                .result.then(function (result) {
                _this.popupService.information('保存成功');
            });
        };
        SettingsController.$inject = [
            '$scope',
            'app/services/popupService',
            'SeedModules.AngularUI/modules/services/requestService',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return SettingsController;
    }());
    mod.controller('SeedModules.Admin/modules/admin/controllers/settings', SettingsController);
});
//# sourceMappingURL=settings.js.map