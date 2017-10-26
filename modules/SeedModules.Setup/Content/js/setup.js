define('seedmodules/setup', [
    'app/application'
], function (application) {
    'use strict';

    application.requires.push('seedmodules.setup');

    return angular
        .module('seedmodules.setup', [])
        .directive('equals', function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ngModelCtrl) {
                    function validateEqual(myValue) {
                        var valid = myValue === scope.$eval(attrs.equals);
                        ngModelCtrl.$setValidity('equal', valid);
                        return valid ? myValue : null;
                    }
                    ngModelCtrl.$parsers.push(validateEqual);
                    ngModelCtrl.$formatters.push(validateEqual);
                    scope.$watch(attrs.equals, function () {
                        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                    });
                }
            };
        })
        .controller('seedmodules.setup', [
            '$scope',
            '$http',
            'app.services.popupService',
            'app.services.httpService',
            function ($scope, $http, popupService, httpService) {
                this.purposes = [{
                    Id: '1',
                    Name: '管理系统'
                }];
                this.databaseProviders = ['MSSqlServer'];
                $scope.install = function () {
                    $http
                        .post('/api/setup', $scope.data)
                        .then(function (result) {
                            console.log(result);
                        });
                };
            }
        ]);
});