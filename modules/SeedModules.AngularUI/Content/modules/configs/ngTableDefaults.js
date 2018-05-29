define(["require", "exports"], function (require, exports) {
    "use strict";
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
    return ngTableDefaults;
});
//# sourceMappingURL=ngTableDefaults.js.map