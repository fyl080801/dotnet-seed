(function (options) {
    'use strict';

    function startup(config) {
        require.config(config);
        require(options.requires, function (application) {
            angular.element(document).ready(function () {
                angular.element(document).find('html')
                    .attr('id', 'ng-app')
                    .attr('ng-app', options.app);
                angular.bootstrap(document, [options.app]);
            });
        });
    }

    function initConfigs(config) {
        config.urlArgs = options.urlArgs;
        for (var name in options.references) {
            var reference = options.references[name];
            var referenceType = Object.prototype.toString.call(reference);
            if (referenceType === '[object Object]') {
                config.paths[name] = reference.path;
                if (reference.shim)
                    config.shim[name] = reference.shim;
            } else if (referenceType === '[object String]') {
                config.paths[name] = reference;
            }
        }
        for (var name in options.maps) {
            var map = options.maps[name];
            config.map[name] = map;
        }
    }
})();