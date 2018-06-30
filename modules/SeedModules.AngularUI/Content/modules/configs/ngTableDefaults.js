define(["require", "exports", "SeedModules.AngularUI/modules/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var settings = JSON.parse(document.getElementById('seed-ui').getAttribute('data-site'));
    var ngTableDefaults = {
        options: {},
        schema: {},
        params: {
            count: settings.pageSize
        },
        settings: {
            counts: settings.pageCounts.split(/[,?]/)
        }
    };
    boot.value('SeedModules.AngularUI/modules/configs/ngTableDefaults', ngTableDefaults);
});
