define(["require", "exports", "angular", "app/application", "SeedModules.AngularUI/modules/configs/httpConfig", "SeedModules.AngularUI/modules/configs/location", "SeedModules.AngularUI/modules/configs/ngTableDefaults", "SeedModules.AngularUI/modules/configs/ngTableTemplates", "SeedModules.AngularUI/modules/configs/schemaForm", "SeedModules.AngularUI/modules/configs/form/simplecolor", "SeedModules.AngularUI/modules/configs/form/switchField", "SeedModules.AngularUI/modules/configs/form/layout", "SeedModules.AngularUI/modules/configs/form/panel", "SeedModules.AngularUI/modules/configs/form/table", "SeedModules.AngularUI/modules/providers/ngTableDefaultGetData", "SeedModules.AngularUI/modules/configs/schemaFormDefaults"], function (require, exports, angular) {
    "use strict";
    var RouteClass = (function () {
        function RouteClass($provide, $appConfig) {
            var settings = JSON.parse(document.getElementById('seed-ui').getAttribute('data-site'));
            settings.prefix = settings.prefix ? '/' + settings.prefix : '';
            $appConfig.siteSettings = settings;
        }
        RouteClass.$inject = ['$provide', '$appConfig'];
        return RouteClass;
    }());
    angular.module('template/modal/window.html', []).run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('template/modal/window.html', '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n' +
                '    <div class="modal-dialog modal-{{size}}"><div class="modal-content" modal-transclude></div></div>\n' +
                '</div>');
        }
    ]);
    return angular
        .module('modules.angularui', ['modules.angularui.boot'])
        .config(RouteClass);
});

//# sourceMappingURL=module.js.map
