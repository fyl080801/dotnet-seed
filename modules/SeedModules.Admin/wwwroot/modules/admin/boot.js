define(["require", "exports", "angular", "app/application", "angular-ui-router", "SeedModules.AngularUI/js/seed/bootstrap-decorator"], function (require, exports, angular) {
    "use strict";
    var instance = angular.module('modules.admin.boot', [
        'ui.router',
        'schemaForm'
    ]);
    return instance;
});
//# sourceMappingURL=boot.js.map