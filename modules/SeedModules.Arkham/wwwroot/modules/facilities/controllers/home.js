define(["require", "exports", "SeedModules.Arkham/modules/facilities/module"], function (require, exports, mod) {
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
            $scope.tableParams = new ngTableRequest({}).ngTableParams();
        }
        Controller.prototype.create = function () { };
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