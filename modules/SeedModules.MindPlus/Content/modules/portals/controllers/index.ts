import mod = require('SeedModules.MindPlus/modules/portals/module');

class ControllerClass {
  addSlide() {
    var newWidth = 600 + this.$scope.slides.length + 1;
    this.$scope.slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text:
        ['More', 'Extra', 'Lots of', 'Surplus'][this.$scope.slides.length % 4] +
        ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][this.$scope.slides.length % 4]
    });
  }
  static $inject = ['$scope', '$appConfig'];
  constructor(private $scope, private $appConfig) {
    $scope.vm = this;
    $scope.$appConfig = $appConfig;
    $scope.myInterval = 5000;
    $scope.slides = [];

    for (var i = 0; i < 4; i++) {
      this.addSlide();
    }
  }
}

mod.controller(
  'SeedModules.MindPlus/modules/portals/controllers/index',
  ControllerClass
);
