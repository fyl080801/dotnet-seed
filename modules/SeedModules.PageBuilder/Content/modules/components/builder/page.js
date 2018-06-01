define(["require", "exports"], function (require, exports) {
    "use strict";
    var PageController = (function () {
        function PageController($scope) {
            this.$scope = $scope;
        }
        PageController.prototype.keywordCallback = function () { };
        PageController.$inject = ['$scope'];
        return PageController;
    }());
    return PageController;
});
//# sourceMappingURL=page.js.map