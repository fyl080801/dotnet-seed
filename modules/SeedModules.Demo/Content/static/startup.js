'use strict';
(function (options) {
    var configs = {
        urlArgs: document.getElementById('app').getAttribute('data-args'),
        paths: {},
        shim: {},
        map: options.map || {},
        waitSeconds: 0
    };
    var references = options['configs'];
    var requires = ['app/application'];
    for (var name in references) {
        var reference = references[name];
        var referenceType = Object.prototype.toString.call(reference);
        if (referenceType === '[object Object]') {
            configs.paths[name] = reference.path;
            if (reference.shim)
                configs.shim[name] = reference.shim;
            if (reference.required) {
                requires.push(name);
            }
        }
        else if (referenceType === '[object String]') {
            configs.paths[name] = reference;
        }
    }
    if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') ===
        'no-js lte-ie8') {
        requires = options.patchs.concat(requires);
    }
    require.config(configs);
    require(requires.concat(options['requires']), function () {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app.application']);
            angular
                .element(document)
                .find('html')
                .addClass('ng-app');
        });
    });
})(window['options']);
//# sourceMappingURL=startup.js.map