import mod = require('SeedModules.Admin/modules/login/module');

class LoginController {
  login() {
    this.requestService
      .url('/api/account/login?ReturnUrl=' + this.$location.search().ReturnUrl)
      .post(this.$scope.data)
      .then(function(result) {
        if (result.success) {
          window.location = result.returnUrl;
        }
      });
  }

  static $inject = [
    '$scope',
    '$location',
    'SeedModules.AngularUI/modules/services/requestService'
  ];

  constructor(
    private $scope,
    private $location: ng.ILocationService,
    private requestService
  ) {
    $scope.data = {};
  }
}

mod.controller(
  'SeedModules.Admin/modules/login/controllers/login',
  LoginController
);
