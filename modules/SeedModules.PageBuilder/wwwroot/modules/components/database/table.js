define(["require", "exports", "SeedModules.PageBuilder/modules/module", "angular", "SeedModules.PageBuilder/modules/configs/enums"], function (require, exports, mod, angular, enums_1) {
    "use strict";
    exports.__esModule = true;
    var ControllerClass = (function () {
        function ControllerClass($scope, $rootScope, $state, $modal, popupService, requestService, schemaFormParams) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$modal = $modal;
            this.popupService = popupService;
            this.requestService = requestService;
            this.schemaFormParams = schemaFormParams;
            $scope.vm = this;
            $scope.list = [];
            $scope.search = {
                keyword: ''
            };
        }
        ControllerClass.prototype.load = function () {
            var _this = this;
            this.requestService
                .url('/api/pagebuilder/define/' + enums_1.BuilderDefineTypes.表)
                .get()
                .result.then(function (result) {
                _this.$scope.list = result;
            });
        };
        ControllerClass.prototype.add = function () {
            var _this = this;
            this.$modal
                .open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/database/tableForm.html',
                scope: angular.extend(this.$rootScope.$new(), {
                    $data: {
                        title: '编辑表',
                        model: {}
                    }
                }),
                size: 'lg'
            })
                .result.then(function (data) {
                _this.requestService
                    .url('/api/pagebuilder/define')
                    .put({
                    type: enums_1.BuilderDefineTypes.表,
                    properties: data
                })
                    .result.then(function (result) {
                    _this.load();
                });
            });
        };
        ControllerClass.prototype.edit = function (row) {
            var _this = this;
            this.$modal
                .open({
                templateUrl: '/SeedModules.PageBuilder/modules/components/database/tableForm.html',
                scope: angular.extend(this.$rootScope.$new(), {
                    $data: {
                        title: '编辑表',
                        model: $.extend({}, row.properties)
                    }
                }),
                size: 'lg'
            })
                .result.then(function (data) {
                _this.requestService
                    .url('/api/pagebuilder/define')
                    .put({
                    id: row.id,
                    type: enums_1.BuilderDefineTypes.表,
                    properties: data
                })
                    .result.then(function (result) {
                    _this.load();
                });
            });
        };
        ControllerClass.prototype.drop = function (row) {
            var _this = this;
            this.popupService.confirm('是否删除？').ok(function () {
                _this.requestService
                    .url('/api/pagebuilder/define/' + row.id)
                    .drop()
                    .result.then(function (result) {
                    _this.load();
                });
            });
        };
        ControllerClass.prototype.fire = function () {
            this.requestService
                .url('/api/pagebuilder/table/fire')
                .patch()
                .result.then(function (result) { });
        };
        ControllerClass.$inject = [
            '$scope',
            '$rootScope',
            '$state',
            '$modal',
            'app/services/popupService',
            'SeedModules.AngularUI/modules/services/requestService',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return ControllerClass;
    }());
    mod.controller('SeedModules.PageBuilder/modules/components/database/table', ControllerClass);
});
//# sourceMappingURL=table.js.map