define([
    'app.application'
], function (application) {
    'use strict';

    application.requires.push('modules.angularui');

    return angular
        .module('modules.angularui', [])
        .config(['$provide', '$appConfig',
            function ($provide, $appConfig) {
                // var app = $('#app').length > 0 ? $('#app') : null;
                // $appConfig.serviceUrl = app ? app.attr('data-service') : '';
            }
        ]);
});