import mod = require('SeedModules.Admin/modules/login/module');

class LoginController {
  login() {
    this.requestService
      .url('/api/account/login?ReturnUrl=' + this.$location.search().ReturnUrl)
      .post<any>(this.$scope.data)
      .result.then(result => {
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
    private requestService: AngularUI.services.IRequestService
  ) {
    $scope.data = {};
  }
}

mod.controller(
  'SeedModules.Admin/modules/login/controllers/login',
  LoginController
);
