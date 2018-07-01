define(["require", "exports", "SeedModules.Admin/modules/login/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var LoginController = (function () {
        function LoginController($scope, $location, requestService) {
            this.$scope = $scope;
            this.$location = $location;
            this.requestService = requestService;
            $scope.data = {};
        }
        LoginController.prototype.login = function () {
            this.requestService
                .url('/api/account/login?ReturnUrl=' + this.$location.search().ReturnUrl)
                .post(this.$scope.data)
                .result.then(function (result) {
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
        LoginController.$inject = [
            '$scope',
            '$location',
            'SeedModules.AngularUI/modules/services/requestService'
        ];
        return LoginController;
    }());
    mod.controller('SeedModules.Admin/modules/login/controllers/login', LoginController);
});
//# sourceMappingURL=login.js.map