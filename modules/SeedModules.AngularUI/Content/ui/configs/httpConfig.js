define([
    'SeedModules.AngularUI/ui/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        '$httpProvider',
        function ($provide, $httpProvider) {
            // $provide.decorator('app.factories.httpDataHandler', ['$delegate', '$rootScope', '$modal', '$appEnvironment',
            //     function ($delegate, $rootScope, $modal, $appEnvironment) {
            //         $delegate.doResponse = function (response, defer) {
            //             response.data = response.data ? response.data : {};
            //             $appEnvironment.session = response.data.Session ? response.data.Session : null;
            //             if (response.data && response.data.Success === false) {
            //                 $delegate.doError(response, defer);
            //             } else {
            //                 if (response.config.url.indexOf('command') >= 0 && response.data.Data) {
            //                     var result = {};
            //                     $.each(response.data.Data, function (index, item) {
            //                         if (result[item.Name]) {
            //                             $.each(item.Result, function (i, v) {
            //                                 result[item.Name].push(v);
            //                             });
            //                         } else {
            //                             result[item.Name] = item.Result;
            //                         }
            //                     });
            //                     response.data.Data = result;
            //                 }
            //                 defer.resolve(response.data.Data ? response.data.Data : response.data);
            //             }
            //         };

            //         $delegate.doError = function (response, defer) {
            //             response.data = response.data ? response.data : {};
            //             $appEnvironment.session = response.data.Session ? response.data.Session : null;
            //             errorModal(response, $rootScope, $modal);
            //             defer.reject(response.data.Errors ? response.data.Errors : response.data);
            //         };

            //         return $delegate;
            //     }
            // ]);

            // function errorModal(response, $rootScope, $modal) {
            //     var scope = $rootScope.$new();
            //     scope.$data = {};
            //     if (response.data.Errors) {
            //         scope.$data.contents = response.data.Errors;
            //     } else if (response.data.Message) {
            //         scope.$data.text = response.data.Message;
            //     } else {
            //         scope.$data.text = '发生错误！';
            //     }
            //     $modal.open({
            //         templateUrl: 'templates/modal/Error.html',
            //         scope: scope
            //     });
            // }
        }
    ]);
});