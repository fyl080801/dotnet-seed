define([
    'SeedModules.AngularUI/ui/module',
    'jquery-form'
], function (module) {
    'use strict';

    module.directive('ajaxForm', [
        '$q',
        'app.factories.httpDataHandler',
        function ($q, httpDataHandler) {
            return {
                restrict: 'AE',
                scope: {
                    ajaxForm: '='
                },
                link: function (scope, element, attr, ctrl) {
                    scope.ajaxForm = $.extend({
                        type: 'POST',
                        dataType: 'json'
                    }, scope.ajaxForm);

                    scope.ajaxForm.submit = function (options) {
                        var defer = $q.defer();

                        var submitOptions = options ? $.extend(scope.ajaxForm, options) : scope.ajaxForm;

                        submitOptions.success = function (response, status, statusText, form) {
                            httpDataHandler.doResponse({
                                data: '',
                                config: {
                                    url: scope.ajaxForm.url
                                }
                            }, defer);
                        };

                        submitOptions.error = function (response, status, statusText, form) {
                            httpDataHandler.doError({
                                data: '',
                                config: {
                                    url: scope.ajaxForm.url
                                }
                            }, defer);
                        };

                        $(element).ajaxSubmit(submitOptions);

                        return defer.promise;
                    };
                }
            }
        }
    ]);
});