define(['SeedModules.MindPlus/modules/mind/configs'], function (configs) {
    'use strict';
    configs.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('modules/directive/kityminderEditor/kityminderEditor.html', '<div class="minder-editor-container"><div class="top-tab" top-tab="minder" editor="editor" ng-if="minder"></div><div search-box minder="minder" ng-if="minder"></div><div class="minder-editor"></div><div class="navigator" navigator minder="minder" ng-if="minder"></div></div>');
        }
    ]);
});
//# sourceMappingURL=mindTemplates.js.map