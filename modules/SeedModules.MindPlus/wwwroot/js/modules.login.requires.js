define('SeedModules.MindPlus/modules/login/controllers/login', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/login/module'
], function (require, exports, mod) {
    'use strict';
    exports.__esModule = true;
    var Controller = function () {
        function Controller($scope, $location, requestService) {
            this.$scope = $scope;
            this.$location = $location;
            this.requestService = requestService;
            $scope.vm = this;
            $scope.data = {};
        }
        Controller.prototype.login = function () {
            this.requestService.url('/api/account/login?ReturnUrl=' + this.$location.search().ReturnUrl).post(this.$scope.data).result.then(function (result) {
                if (result.success) {
                    window.location = result.returnUrl;
                }
            });
        };
        Controller.prototype.enterlogin = function ($event, form) {
            if ($event.keyCode !== 13 || form.$invalid)
                return;
            this.login();
        };
        Controller.$inject = [
            '$scope',
            '$location',
            'SeedModules.AngularUI/modules/services/requestService'
        ];
        return Controller;
    }();
    mod.controller('SeedModules.MindPlus/modules/login/controllers/login', Controller);
});
define('SeedModules.MindPlus/modules/login/requires', [
    'require',
    'exports',
    'SeedModules.MindPlus/modules/login/controllers/login'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
});