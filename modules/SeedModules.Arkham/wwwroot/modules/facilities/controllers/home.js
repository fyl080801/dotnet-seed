define(["require", "exports", "SeedModules.Arkham/modules/facilities/module", "../components/forms/medicalForm"], function (require, exports, mod, medicalForm) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope, $modal, $q, $timeout, popupService, requestService, ngTableRequest, schemaFormParams) {
            this.$scope = $scope;
            this.$modal = $modal;
            this.$q = $q;
            this.$timeout = $timeout;
            this.popupService = popupService;
            this.requestService = requestService;
            this.ngTableRequest = ngTableRequest;
            this.schemaFormParams = schemaFormParams;
            $scope.$controller = this;
            $scope.search = {
                keyword: ''
            };
            $scope.tableParams = new ngTableRequest({
                url: '/api/admin/users/query'
            }).ngTableParams();
        }
        Controller.prototype.create = function () {
            this.$modal
                .open({
                templateUrl: '/SeedModules.AngularUI/modules/views/schemaConfirm.html',
                size: 'lg',
                data: {
                    title: '新建病案',
                    formParams: new this.schemaFormParams().properties(medicalForm["default"].medicalSchema),
                    form: medicalForm["default"].medicalForm
                }
            })
                .result.then(function (data) { });
        };
        Controller.prototype.keywordCallback = function () { };
        Controller.$inject = [
            '$scope',
            '$modal',
            '$q',
            '$timeout',
            'app/services/popupService',
            'SeedModules.AngularUI/modules/services/requestService',
            'SeedModules.AngularUI/modules/factories/ngTableRequest',
            'SeedModules.AngularUI/modules/factories/schemaFormParams'
        ];
        return Controller;
    }());
    mod.controller('SeedModules.Arkham/modules/facilities/controllers/home', Controller);
});
//# sourceMappingURL=home.js.map