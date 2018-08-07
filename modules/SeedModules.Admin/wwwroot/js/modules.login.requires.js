define('SeedModules.Admin/modules/login/controllers/login', [
    'require',
    'exports',
    'SeedModules.Admin/modules/login/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var LoginController = function () {
        function LoginController($scope, $location, requestService, popupService) {
            this.$scope = $scope;
            this.$location = $location;
            this.requestService = requestService;
            this.popupService = popupService;
            $scope.vm = this;
            $scope.data = {};
        }
        LoginController.prototype.login = function () {
            this.requestService.url('/api/account/login?ReturnUrl=' + this.$location.search().ReturnUrl).post(this.$scope.data).result.then(function (result) {
                if (result.success) {
                    window.location = result.returnUrl;
                }
            });
        };
        LoginController.prototype.enterlogin = function ($event, form) {
            if ($event.keyCode !== 13 || form.$invalid)
                return;
            this.login();
        };
        LoginController.prototype.buildinginfo = function () {
            this.popupService.information('我就晚上有时间\uFF0C辣么多功能得一点点来呀');
        };
        LoginController.$inject = [
            '$scope',
            '$location',
            'SeedModules.AngularUI/modules/services/requestService',
            'app/services/popupService'
        ];
        return LoginController;
    }();
    mod.controller('SeedModules.Admin/modules/login/controllers/login', LoginController);
});
define('SeedModules.Admin/modules/login/requires', [
    'require',
    'exports',
    'SeedModules.Admin/modules/login/controllers/login'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
});