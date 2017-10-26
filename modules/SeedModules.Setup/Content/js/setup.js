define('seedmodule/setup', [
    'app/application'
], function (application) {
    'use strict';

    application.requires.push('seedmodule.setup');

    application.module('seedmodule.setup', [])
        .controller('seedmodule.setup', [
            '$scope',
            function ($scope) {

            }
        ]);
});