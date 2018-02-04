define([
    'SeedModules.AngularUI/ui/configs'
], function (configs) {
    'use strict';

    configs.provider('SeedModules.AngularUI/ui/configs/storeAdapter', [
        function () {
            this.$get = [
                '$http',
                function ($http) {

                    function resolveUrl(apiDefer) {
                        var rawUrl = '/' + apiDefer.apis.join('/');
                        // 加querystring apiDefer.queries
                        return rawUrl;
                    }

                    return {
                        get: function (apiDefer) {
                            throw '未实现该方法';
                        },
                        post: function (apiDefer, data) {
                            throw '未实现该方法';
                        },
                        put: function (apiDefer, data) {
                            throw '未实现该方法';
                        },
                        patch: function (apiDefer, data) {
                            throw '未实现该方法';
                        },
                        drop: function (apiDefer) {
                            throw '未实现该方法';
                        }
                    };
                }
            ];
        }
    ]);
});