(function (options) {
    'use strict';

    function run(requires, config) {
        require.config(config);
        require(requires, function (application) {
            angular.element(document).ready(function () {
                angular.element(document).find('html')
                    .attr('id', 'ng-app')
                    .attr('ng-app', 'app.application');
                angular.bootstrap(document, ['app.application']);
            });
        });
    }

    function initReference(requires, config, references) {
        for (var name in references) {
            var reference = references[name];
            var referenceType = Object.prototype.toString.call(reference);
            if (referenceType === '[object Object]') {
                config.paths[name] = reference.path;
                if (reference.shim) config.shim[name] = reference.shim;
                if (reference.required) requires.push(name);
            } else if (referenceType === '[object String]') {
                config.paths[name] = reference;
            }
        }
    }

    function initModules(appRequires, optionRequires) {
        for (var idx in optionRequires) {
            appRequires.push(optionRequires[idx]);
        }
    }

    function initBrowserPatch(config) {
        if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') === 'no-js lte-ie8') {
            config.shim.app = {
                deps: ['patch']
            };
            config.shim.rcss = {
                deps: ['patch']
            };
        }
    }

    var requires = ['app/application'],
        config = {
            urlArgs: 'v=' + options.version,
            paths: {
                'patch': 'patch',
                'rcss': 'app',
                'angular': 'app',
                'app': 'app',
                'app/application': 'app.application'
            },
            shim: {
                'app/application': {
                    deps: ['app']
                }
            }
        };

    initBrowserPatch(config);
    initReference(requires, config, options.references);
    initModules(requires, options.requires);
    run(requires, config);

})(eval('(' + document.getElementById('seed-ui').getAttribute('data-options') + ')'));
//    ({
//    version: '',
//    references: {

//    },
//    requires: [

//    ],
//    noDebugs: []
//});