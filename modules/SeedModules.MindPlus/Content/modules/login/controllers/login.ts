import mod = require('SeedModules.MindPlus/modules/login/module');

class Controller {
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

  enterlogin($event: KeyboardEvent, form: ng.IFormController) {
    if ($event.keyCode !== 13 || form.$invalid) return;
    this.login();
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
    $scope.vm = this;
    $scope.data = {};
  }
}

mod.controller(
  'SeedModules.MindPlus/modules/login/controllers/login',
  Controller
);
