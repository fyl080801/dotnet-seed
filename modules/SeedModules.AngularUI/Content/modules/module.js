define(["require", "exports", "angular", "SeedModules.AngularUI/modules/configs/httpConfig", "SeedModules.AngularUI/modules/configs/location", "SeedModules.AngularUI/modules/configs/ngTableDefaults", "SeedModules.AngularUI/modules/configs/ngTableTemplates", "SeedModules.AngularUI/modules/configs/schemaFormDefaults", "SeedModules.AngularUI/modules/configs/schemaForm", "SeedModules.AngularUI/modules/configs/form/simplecolor", "SeedModules.AngularUI/modules/configs/form/switchField", "SeedModules.AngularUI/modules/providers/ngTableDefaultGetData"], function (require, exports, angular) {
    "use strict";
    return angular
        .module('modules.angularui', [
        'modules.angularui.configs',
        'modules.angularui.providers'
    ])
        .config([
        '$provide',
        '$appConfig',
        function ($provide, $appConfig) {
            var settings = JSON.parse(document.getElementById('seed-ui').getAttribute('data-site'));
            settings.prefix = settings.prefix ? '/' + settings.prefix : '';
            $appConfig.siteSettings = settings;
        }
    ]);
});
//# sourceMappingURL=module.js.map