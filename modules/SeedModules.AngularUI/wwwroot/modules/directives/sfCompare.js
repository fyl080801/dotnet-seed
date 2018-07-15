define(['SeedModules.AngularUI/modules/module'], function (module) {
    'use strict';
    module.directive('sfCompare', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'AC',
                require: 'ngModel',
                link: function (scope, element, attrs, ctrl) {
                    var form = scope.$eval(attrs.sfChanged);
                    ctrl.$viewChangeListeners.push(function () {
                        var validity = angular.isFunction(form.compare)
                            ? form.compare(ctrl.$modelValue, scope.model, form)
                            : scope.evalExpr(form.compare, {
                                modelValue: ctrl.$modelValue,
                                model: scope.model,
                                form: form
                            });
                        scope.ngModel.$setValidity('compare', validity === true);
                    });
                }
            };
        }
    ]);
});
//# sourceMappingURL=sfCompare.js.map