(function(options) {
  'use strict';

  var config = {
    baseUrl: '/SeedModules.AngularUI/../',
    paths: {},
    map: {},
    shim: {},
    waitSeconds: 0
  };

  initConfigs(config);
  initBrowserPatch(config);
  startup(config);

  function startup(config) {
    define('angular', [], function() {
      'use strict';
      return window.angular;
    });

    require.config(config);
    require(options.requires, function(application) {
      angular.element(document).ready(function() {
        angular
          .element(document)
          .find('html')
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
        if (reference.shim) config.shim[name] = reference.shim;
      } else if (referenceType === '[object String]') {
        config.paths[name] = reference;
      }
    }
    for (var mapName in options.maps) {
      var map = options.maps[mapName];
      config.map[mapName] = map;
    }
  }

  function initBrowserPatch(config) {
    if (
      document
        .getElementsByTagName('html')[0]
        .getAttribute('data-html-type') === 'no-js lte-ie8'
    ) {
      for (var name in options.references) {
        var isPatch = false;
        for (var j = 0; j < options.patchs.length; j++) {
          if (options.patchs[j] + '' === name + '') {
            isPatch = true;
            break;
          }
        }
        if (isPatch) continue;
        config.shim[name] = config.shim[name] || {
          deps: []
        };
        config.shim[name].deps = config.shim[name].deps || [];
        for (var i = 0; i < options.patchs.length; i++) {
          config.shim[name].deps.push(options.patchs[i]);
        }
      }
    }
  }
})(
  eval(
    '(' + document.getElementById('seed-ui').getAttribute('data-options') + ')'
  )
);
