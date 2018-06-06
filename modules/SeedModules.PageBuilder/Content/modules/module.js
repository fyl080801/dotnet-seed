define(["require", "exports", "angular", "app/application", "angular-jsoneditor", "schema-form-bootstrap", "SeedModules.PageBuilder/modules/configs/run", "SeedModules.PageBuilder/modules/configs/defaultTools", "SeedModules.PageBuilder/modules/providers/toolsBuilder"], function (require, exports, angular) {
    "use strict";
    return angular.module('modules.pagebuilder', [
        'modules.pagebuilder.boot',
        'angular-jsoneditor',
        'schemaForm'
    ]);
});
//# sourceMappingURL=module.js.map