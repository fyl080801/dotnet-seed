define(["require", "exports"], function (require, exports) {
    "use strict";
    var PageController = (function () {
        function PageController($scope, popupService) {
            this.$scope = $scope;
            this.popupService = popupService;
        }
        PageController.prototype.keywordCallback = function () { };
        PageController.prototype.drop = function () {
            this.popupService.confirm('是否删除？').ok(function () { });
        };
        PageController.$inject = ['$scope', 'app/services/popupService'];
        return PageController;
    }());
    return PageController;
});
//# sourceMappingURL=page.js.map