define(['SeedModules.AngularUI/modules/module'], function (module) {
    'use strict';
    module.directive('tagInput', [
        function () {
            function getItemProperty(scope, property) {
                if (!property)
                    return undefined;
                if (angular.isFunction(scope.$parent[property]))
                    return scope.$parent[property];
                return function (item) {
                    return item[property];
                };
            }
            return {
                restrict: 'EA',
                scope: {
                    model: '=ngModel',
                    valueField: '@',
                    textField: '@',
                    classField: '@',
                    options: '=tagOptions',
                    disabled: '=ngDisabled',
                    textInput: '@',
                    placeholder: '@placeholder'
                },
                templateUrl: '/SeedModules.AngularUI/modules/templates/tagInput.html',
                replace: true,
                link: function (scope, element, attrs) {
                    scope.getText = function (tag) {
                        return tag[scope.textField || 'text'];
                    };
                    scope.getClass = function (tag) {
                        return tag[scope.classField || 'style'];
                    };
                    scope.getPlaceholder = function () {
                        return scope.placeholder &&
                            (!scope.model || scope.model.length <= 0)
                            ? scope.placeholder
                            : null;
                    };
                    scope.remove = function (tag) { };
                }
            };
        }
    ]);
});

//# sourceMappingURL=tagInput.js.map
