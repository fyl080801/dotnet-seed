define([
    'SeedModules.AngularUI/ui/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        '$httpProvider',
        function ($provide, $httpProvider) {
            $provide.decorator('app.factories.httpDataHandler', [
                '$delegate', '$rootScope', '$modal', '$appEnvironment',
                function ($delegate, $rootScope, $modal, $appEnvironment) {
                    $delegate.doResponse = function (response, defer) {
                        defer.resolve(response.data, response);
                    };

                    $delegate.doError = function (response, defer) {
                        defer.reject(response);
                    };

                    return $delegate;
                }
            ]);
        }
    ]);
});