define([
    'app/application',
    'SeedModules.AngularUI/ui/configs/httpConfig',
    'SeedModules.AngularUI/ui/configs/location'
], function (application) {
    'use strict';

    application.requires.push('modules.angularui');

    return angular
        .module('modules.angularui', [
            'modules.angularui.configs'
        ])
        .config(['$provide', '$appConfig',
            function ($provide, $appConfig) {
                // var app = $('#app').length > 0 ? $('#app') : null;
                // $appConfig.serviceUrl = app ? app.attr('data-service') : '';
            }
        ]);
});