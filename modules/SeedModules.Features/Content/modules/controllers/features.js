define(["require", "exports", "SeedModules.Features/modules/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var FeaturesController = (function () {
        function FeaturesController($scope, requestService) {
            this.$scope = $scope;
            this.requestService = requestService;
            $scope.keyword = '';
            $scope.list = [];
            $scope.features = this;
        }
        FeaturesController.prototype.setEnable = function (feature, enabled) {
            var self = this;
            if (enabled !== undefined) {
                feature.enabled = enabled;
            }
            this.requestService
                .url('/api/features/' + feature.descriptor.id)
                .patch({
                enabled: feature.enabled
            })
                .result.then(function (result) {
                self.load();
            });
        };
        FeaturesController.prototype.load = function () {
            var self = this;
            this.$scope.requesting = this.requestService
                .url('/api/features?keyword=' + this.$scope.keyword)
                .options({
                showLoading: false
            })
                .get();
            this.$scope.requesting.result.then(function (result) {
                self.$scope.list = result.list;
            });
        };
        FeaturesController.prototype.cancelLoad = function () {
            if (this.$scope.requesting) {
                this.$scope.requesting.cancel();
            }
        };
        FeaturesController.$inject = [
            '$scope',
            'SeedModules.AngularUI/modules/services/requestService'
        ];
        return FeaturesController;
    }());
    mod.controller('SeedModules.Features/modules/controllers/features', FeaturesController);
});
//# sourceMappingURL=features.js.map