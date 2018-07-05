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

  enterlogin($event: KeyboardEvent, form: ng.IFormController) {
    if ($event.keyCode !== 13 || form.$invalid) return;
    this.login();
  }

  buildinginfo() {
    this.popupService.information('我就晚上有时间，辣么多功能得一点点来呀');
  }

  static $inject = [
    '$scope',
    '$location',
    'SeedModules.AngularUI/modules/services/requestService',
    'app/services/popupService'
  ];

  constructor(
    private $scope,
    private $location: ng.ILocationService,
    private requestService: AngularUI.services.IRequestService,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;
    $scope.data = {};
  }
}

mod.controller(
  'SeedModules.Admin/modules/login/controllers/login',
  LoginController
);
