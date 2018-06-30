define(["require", "exports", "SeedModules.MindPlus/modules/portals/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var ControllerClass = (function () {
        function ControllerClass($scope, $appConfig) {
            this.$scope = $scope;
            this.$appConfig = $appConfig;
            $scope.vm = this;
            $scope.$appConfig = $appConfig;
            $scope.myInterval = 5000;
            $scope.slides = [];
            for (var i = 0; i < 4; i++) {
                this.addSlide();
            }
        }
        ControllerClass.prototype.addSlide = function () {
            var newWidth = 600 + this.$scope.slides.length + 1;
            this.$scope.slides.push({
                image: 'http://placekitten.com/' + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][this.$scope.slides.length % 4] +
                    ' ' +
                    ['Cats', 'Kittys', 'Felines', 'Cutes'][this.$scope.slides.length % 4]
            });
        };
        ControllerClass.$inject = ['$scope', '$appConfig'];
        return ControllerClass;
    }());
    mod.controller('SeedModules.MindPlus/modules/portals/controllers/index', ControllerClass);
});

//# sourceMappingURL=index.js.map
